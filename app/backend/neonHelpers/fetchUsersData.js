import { fetchCurrentRosters, fetchUserTeamNames } from "../lib/fetchSleeperData.js";

export async function processUserDataForNeon(leagueId) {
    if (!leagueId) {
        throw new Error("A league ID is required to fetch user and roster data");
    }

    const [users, rosters] = await Promise.all([
        fetchUserTeamNames(leagueId),
        fetchCurrentRosters(leagueId)
    ]);

    if (!Array.isArray(users) || !Array.isArray(rosters)) {
        throw new Error("Invalid users or rosters response from Sleeper");
    }

    const userDataMap = new Map();
    users.forEach(({ user_id, display_name, metadata }) => {
        userDataMap.set(user_id, {
            userId: user_id, 
            displayName: display_name, 
            teamName: metadata?.team_name
        });
    });

    for (const { owner_id, roster_id } of rosters) {
        const user = userDataMap.get(owner_id);
        if (user && roster_id != null) {
            user.rosterId = roster_id;
        }
    }
    return userDataMap;
}