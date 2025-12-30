//use matchup data to calculate all time statistics 

import { fetchPastSeasonData } from "../lib/fetchMatchupHistory.js";


export async function calculateAllTimeStatistics() {

    console.log("Entered all time stats fn");
    
    const matchupHistory = await fetchPastSeasonData();
    console.log("Matchup history sample: ", matchupHistory[0]);
    calculateAllTimeWins(matchupHistory);

}

//calculate winningest teams in league history
export function calculateAllTimeWins(matchupHistory) {

    let allTimeWins = 0;
    let allTimeLosses = 0;
    let winPercentage;
    console.log("Entered matchup history");

}

calculateAllTimeStatistics();