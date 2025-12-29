//fetch all prior sleeper regular season data 
//iterate through league IDs, call fetch function 
//can use for ANY historical data fetching 

//if can iterate through league IDs, any Sleeper API fn can be called to get all history data
//pass to data process file to crunch numbers

// for loop to index thru LEAGUES to get each year
//match league ID to year 
//call for matchups w each league Id
import '../config/loadEnv.js';
import { LEAGUES } from "../config/leagues.js";
import { fetchAllMatchups, fetchSpecificLeagueSettings } from "./fetchSleeperData.js";
import { processWeeklyMatchupData } from '../helpers/processWeeklyMatchups.js';

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
        const week = settings.settings.playoff_week_start; 
        const processedData = await processWeeklyMatchupData(season.year, week);
        console.log("DATA FOR SEASON: ", season);
        console.log(processedData);
        results.push(processedData);
    }
    return results;
}

fetchPastSeasonData();