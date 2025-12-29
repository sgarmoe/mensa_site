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


    // for (let i = 0; i < matchupHistory.length; i++) {
    //     console.log("Week of matchup: ", matchupHistory.week);

    // }

    // for (const matchup of matchupHistory) {
    //     console.log("Week: ", matchup.week);
    //     console.log("Winner name: ", matchup.winner);
    //     //need to tie winner name and roster ID - ID is the correct
    //     //data to track all time scores
        
    // }
}

calculateAllTimeStatistics();