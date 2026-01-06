import '../config/loadEnv.js';
import { SEASONS } from "../config/seasons.js";
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

        results.push({
            year: season.year, 
            teams: processedData
        });
    }
    return results;
}
