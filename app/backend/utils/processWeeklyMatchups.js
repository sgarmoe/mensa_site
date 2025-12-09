import { fetchAllMatchups } from "../lib/fetchSleeperData";

export async function processWeeklyMatchupData() {
    const rawData = await fetchAllMatchups();
    
}