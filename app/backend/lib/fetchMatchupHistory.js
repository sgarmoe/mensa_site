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
import { fetchAllMatchups } from "./fetchSleeperData.js";

export async function fetchPastSeasonData() {

    const allWeeks = week ? [week] : Array.from({ length : 14 }, (_, i) => i + 1); 

    const seasons = Object.entries(LEAGUES)
        .filter(([, leagueId]) => Boolean(leagueId))
        .map(([year, leagueId]) => ({
            year: Number(year),
            leagueId
        }))
        .sort((a, b) => a.year - b.year);

    //console.log(LEAGUES);
    //console.log(seasons);
    const results = [];

    for (const season of seasons) {
        //console.log(season.leagueId, week);
        const seasonData = await fetchAllMatchups(season.leagueId, allWeeks); 
        results.push(seasonData);
    }
    console.log(results[10]);
    return results;
}

fetchPastSeasonData();