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

    console.log(LEAGUES);
    const results = [];

    for (const season of seasons) {
        const settings = await fetchSpecificLeagueSettings(season.leagueId);
        console.log(season);
        console.log(season.leagueId);
        console.log(settings.settings.playoff_week_start);
        const processedData = await processWeeklyMatchupData(season.year);
        console.log("DATA FOR SEASON: ", season);
        //console.log(processedData);
        results.push(processedData);
    }
    return results;
}

//fetchPastSeasonData();