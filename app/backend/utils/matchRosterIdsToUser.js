import { fetchUserTeamNames, fetchCurrentRosters } from "../lib/fetchSleeperData.js";


export async function matchRosterIdsToUser() {

    const usersArray = await fetchUserTeamNames();
    const rostersArray = await fetchCurrentRosters();


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

    // profiles.forEach(profile => {
    //     //console.log(`Team name: ${profile.teamName}, Roster ID: ${profile.rosterId}`);
    // });

    return rosterToTeamMap;
}

// function mapUserProfiles(profiles) {
//     const map = new Map();
//     profiles.forEach(({ rosterId, teamName }) => {
//         map.set(rosterId, teamName);
//     });
//     return map;
// }
