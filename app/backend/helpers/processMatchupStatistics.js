//use matchup data to calculate all time statistics 


import { fetchPastSeasonData } from "../lib/fetchMatchupHistory.js";


export async function calculateAllTimeStatistics() {

    console.log("Entered all time stats fn");
    
    const matchupHistoryData = await fetchPastSeasonData();
    console.log(matchupHistoryData[0]);
    calculateAllTimeWins(matchupHistoryData);

}

//calculate winningest teams in league history
export function calculateAllTimeWins(matchupHistoryData) {

    let allTimeWins = 0;
    let allTimeLosses = 0;
    let winPercentage;

    console.log("Entered matchup history");
    
    matchupHistoryData.forEach(function (item) {
        //console.log(item.winner);
        if (item.winner === item.teams.teamA.team_name) {
            
        }
    });

}

calculateAllTimeStatistics();