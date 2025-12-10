import { fetchAllMatchups } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";

export async function processWeeklyMatchupData() {
    const matchupsArray = await fetchAllMatchups();
    const profiles = await matchRosterIdsToUser();

    const weeklyMatchups = [];

    //end w array objects w following:
    //both team names, both rosters IDs, matchup ID, week
    //points for both teams, victor, loser

    //NESTED LOOPS TO DESTRUCTURE MATCHUPS  

    const matchupMap = new Map();

    matchupsArray.forEach(matchup => {
        const matchupId = matchup.matchup_id;
        const rosterId = matchup.roster_id;
        console.log(matchupId, rosterId);
    })






    // rawData.forEach(({ week, matchups })  => {
    //     console.log(`Processing data for Week ${week}`);

    //     matchups.forEach(matchup => {
    //         console.log(`Matchup ID: ${matchup.matchup_id}, Points: ${matchup.points}`);
            
            
    //     })
    // })
    
}

processWeeklyMatchupData();
