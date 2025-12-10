import { fetchAllMatchups } from "../lib/fetchSleeperData.js";

export async function processWeeklyMatchupData() {
    const rawData = await fetchAllMatchups();

    const weeklyMatchups = [];

    rawData.forEach(({ week, matchups })  => {
        console.log(`Processing data for Week ${week}`);

        matchups.forEach(matchup => {
            console.log(`Matchup ID: ${matchup.matchup_id}, Points: ${matchup.points}`);
            
        })
    })
    
}

//processWeeklyMatchupData();
