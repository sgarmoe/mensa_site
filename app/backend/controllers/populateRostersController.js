import { populateBench, populateIR, populateStarters, populateTaxi } from "../helpers/populateRosters.js";
import { fetchCurrentRosters, fetchUserTeamNames } from "../lib/fetchSleeperData.js";
import { SEASONS } from "../config/seasons.js";

//controller that populates all rosters by calling Sleeper API &
//matches IDs w/ player names from mongo

export async function populateAllRosters(year) {
    try {
        console.log("Logging year");
        console.log(year);
        const leagueId = SEASONS[year].leagueId;
        console.log("League ID: ", leagueId);

        const rosters = await fetchCurrentRosters(leagueId);
        const users = await fetchUserTeamNames(leagueId);

        if (!Array.isArray(rosters) || rosters.length === 0) {
            console.log("No rosters found");
            return [];
        }

        console.log(`Processing ${rosters.length} rosters`);

        const populatedRosters = [];

        for (const [index, roster] of rosters.entries()) {

            const user = users.find(user => user.user_id === roster.owner_id); //matches Sleeper ID of the user to the owner of the roster
            const teamName = user?.metadata?.team_name || 'Unknown Team'; //associates User ID to the team name fetched above

            const starters = await populateStarters(roster.starters);
            const injuredReserve = await populateIR(roster.reserve);
            const taxi = await populateTaxi(roster.taxi);
            const bench = await populateBench(roster);

            populatedRosters.push({
                owner_id : roster.owner_id,
                team_name: teamName,
                starters, 
                injuredReserve, 
                taxi,
                bench
            });
        }

        console.log("All rosters successfully populated");
        return populatedRosters;
    } catch (error) {
        console.log("Error populating rosters: " + error); 
        return [];
    }

}