import { fetchUserTeamNames, fetchCurrentRosters } from "../lib/fetchSleeperData.js";


export async function matchRosterIdsToUser() {

    const usersArray = await fetchUserTeamNames();
    const rostersArray = await fetchCurrentRosters();

    const profiles = [];

    const userMap = new Map();
    usersArray.forEach(({ user_id, metadata }) => {
        const teamName = metadata?.team_name || 'Unnamed Team';
        userMap.set(user_id, teamName);
    });


    rostersArray.forEach(roster => {
        const ownerId = roster.owner_id; 
        const rosterId = roster.roster_id;
        const teamNameFinal = userMap.get(ownerId);

        if (teamNameFinal && rosterId) {
            profiles.push({
                teamName: teamNameFinal, 
                rosterId, rosterId
            });
        }
    });

    // profiles.forEach(profile => {
    //     //console.log(`Team name: ${profile.teamName}, Roster ID: ${profile.rosterId}`);
    // });
    return profiles;
}
