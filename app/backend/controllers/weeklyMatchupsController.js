import { all } from "axios";
import { processWeeklyMatchupData } from "../helpers/processWeeklyMatchupData.js";

export async function matchupsController(year) {

    if (!year) {
        throw new Error("Year is required param");
    }

    const allMatchups = await processWeeklyMatchupData(year);
    //console.log(allMatchups);
    return allMatchups;
}
