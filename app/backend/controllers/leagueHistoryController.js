//remove me entirely? seems redundant



import { calculateAllTimeStatistics } from "../helpers/processAllTimeData.js";

export async function processAllTimeData() {
    
    const allTimeData = await calculateAllTimeStatistics();
    return allTimeData;
}

//processAllTimeData();