import { processWeeklyMatchupData } from "../helpers/processWeeklyMatchups.js";

export async function matchupsController(year, week) {

    if (!year) {
        throw new Error("Year is required param");
    }

    const allMatchups = await processWeeklyMatchupData(year, week);
    return allMatchups;
}
