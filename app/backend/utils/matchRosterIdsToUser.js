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

    // users.forEach(({ display_name, metadata }) => {
    //     //console.log(`Processing data for ${username} `);
    //     const teamName = metadata.team_name; 
    //     console.log(`Username: ${display_name}, Team name: ${teamName}`);
    //     profiles.push(teamName);
    // }) 

    // rosters.forEach(roster => {
    //     const rosterId = roster.roster_id;
    //     profiles.push(rosterId);
    // })


    profiles.forEach(profile => {
        console.log(`Team name: ${profile.teamName}, Roster ID: ${profile.rosterId}`);
    });

    return profiles;
}

matchRosterIdsToUser();