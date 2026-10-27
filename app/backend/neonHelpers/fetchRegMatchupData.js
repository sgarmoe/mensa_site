import { calculateAllTimeStatistics, calculateAllTimeWins } from "../helpers/processAllTimeData.js";
import { processWeeklyMatchupData } from "../helpers/processWeeklyMatchupData.js";

export async function processMatchupDataForNeon(year) {
    if (!year) {
        throw new Error("A league ID is required to fetch matchup data");
    }

    const matchups = await processWeeklyMatchupData(year);

    if (!Array.isArray(matchups)) {
        throw new Error("Invalid matchup data response");
    }

    const matchupMap = new Map(); 
}








