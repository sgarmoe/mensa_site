import { fetchUserTeamNames, fetchCurrentRosters } from "../lib/fetchSleeperData.js";
import { LEAGUES } from "../config/leagues.js";

const year = 2025;
const leagueId = LEAGUES[year];

export async function matchRosterIdsToUser() {

    const usersArray = await fetchUserTeamNames(leagueId);
    const rostersArray = await fetchCurrentRosters(leagueId);

    if (!Array.isArray(usersArray) || !Array.isArray(rostersArray)) {
        throw new Error("Invalid Sleeper data format");
    }

    const userMap = new Map();
    usersArray.forEach(({ user_id, metadata }) => {
        userMap.set(
            user_id, 
            metadata?.team_name || 'Unnamed Team'
        );
    });

    const rosterToTeamMap = new Map();

    rostersArray.forEach(({ owner_id, roster_id }) => {
       
        const teamName = userMap.get(owner_id);

        if (teamName && roster_id != null) {
            rosterToTeamMap.set(roster_id, teamName);
        }
    });
    return rosterToTeamMap;
}
