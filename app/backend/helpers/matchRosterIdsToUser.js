import { fetchUserTeamNames, fetchCurrentRosters } from "../lib/fetchSleeperData.js";

const profilesCache = new Map(); // leagueId → { data: Map, expiresAt: number }
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function matchRosterIdsToUser(leagueId) {
    const cached = profilesCache.get(leagueId);
    if (cached && Date.now() < cached.expiresAt) {
        return cached.data;
    }

    const [usersArray, rostersArray] = await Promise.all([
        fetchUserTeamNames(leagueId),
        fetchCurrentRosters(leagueId)
    ]);

    if (!Array.isArray(usersArray) || !Array.isArray(rostersArray)) {
        throw new Error("Invalid Sleeper data format");
    }

    const userMap = new Map();
    usersArray.forEach(({ user_id, metadata, display_name, avatar }) => {
        userMap.set(user_id, {
            displayName: display_name,
            teamName: metadata?.team_name || "Unnamed team",
            avatar: metadata?.avatar || avatar
        });
    });

    const rosterToTeamMap = new Map();

    rostersArray.forEach(({ owner_id, roster_id }) => {
        const user = userMap.get(owner_id);

        if (user && roster_id != null) {
            rosterToTeamMap.set(roster_id, {
                displayName: user.displayName,
                teamName: user.teamName,
                avatar: user.avatar
            });
        }
    });
    profilesCache.set(leagueId, { data: rosterToTeamMap, expiresAt: Date.now() + CACHE_TTL });
    return rosterToTeamMap;
}
