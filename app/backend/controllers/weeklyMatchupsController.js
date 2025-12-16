import { processWeeklyMatchupData } from "../helpers/processWeeklyMatchups.js";

export async function matchupsController() {
    const allMatchups = await processWeeklyMatchupData();

    if (!allMatchups) {
        console.log("Error returning all matchup data: ", error);
        return;
    }

    //console.log("Matchup sample: ", allMatchups[40]);
    return allMatchups;

    //logic to call for matchups w null checks
    //use test file to verify functionality after
}


matchupsController();
