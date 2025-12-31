import '../config/loadEnv.js';
import { LEAGUES } from "../config/leagues.js";
import { fetchSpecificLeagueSettings } from "./fetchSleeperData.js";
import { processWeeklyMatchupData } from '../helpers/processWeeklyMatchupData.js';

export async function fetchPastSeasonData() {

    const seasons = Object.entries(LEAGUES)
        .filter(([, leagueId]) => Boolean(leagueId))
        .map(([year, leagueId]) => ({
            year: Number(year),
            leagueId
        }))
        .sort((a, b) => a.year - b.year);

    const results = [];

    //generates array of objects for each season
    for (const season of seasons) {
        const settings = await fetchSpecificLeagueSettings(season.leagueId);
        const processedData = await processWeeklyMatchupData(season.year);
      
        console.log("DATA FOR SEASON: ", season);
        console.log(processedData[0]);
        results.push(...processedData);
    }
    
    return results;
}

fetchPastSeasonData();