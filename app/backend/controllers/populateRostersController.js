import { populateBench, populateIR, populateStarters, populateTaxi } from "../helpers/populateRosters.js";
import { fetchCurrentRosters, fetchUserTeamNames, fetchSpecificLeagueSettings } from "../lib/fetchSleeperData.js";
import { SEASONS } from "../config/seasons.js";

//controller that populates all rosters by calling Sleeper API &
//matches IDs w/ player names from mongo

export async function populateAllRosters(year) {
    try {
        const leagueId = SEASONS[year].leagueId;

        const [rosters, users, leagueSettings] = await Promise.all([
            fetchCurrentRosters(leagueId),
            fetchUserTeamNames(leagueId),
            fetchSpecificLeagueSettings(leagueId),
        ]);

        if (!Array.isArray(rosters) || rosters.length === 0) {
            console.log("No rosters found");
            return [];
        }

        // Derive ordered starter slot labels from league settings (exclude BN/IR)
        const rosterPositions = leagueSettings?.roster_positions || [];
        const starterSlots = rosterPositions.filter(p => p !== "BN" && p !== "IR");

        const populatedRosters = [];

        for (const roster of rosters) {
            const user = users.find(u => u.user_id === roster.owner_id);
            const teamName = user?.metadata?.team_name || "Unknown Team";
            const avatar = user?.metadata?.avatar || user?.avatar || null;

            const starters = await populateStarters(roster.starters, starterSlots);
            const injuredReserve = await populateIR(roster.reserve);
            const taxi = await populateTaxi(roster.taxi);
            const bench = await populateBench(roster);

            populatedRosters.push({
                owner_id: roster.owner_id,
                team_name: teamName,
                avatar,
                starters,
                injuredReserve,
                taxi,
                bench
            });
        }

        return populatedRosters;
    } catch (error) {
        console.log("Error populating rosters: " + error);
        return [];
    }
}