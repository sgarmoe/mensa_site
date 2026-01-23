import '../config/loadEnv.js';
import { SEASONS } from "../config/seasons.js";
import { processAllTimeData } from '../controllers/leagueHistoryController.js';
import { processWeeklyMatchupData } from './processWeeklyMatchupData.js';

export async function calculateAllTimeStatistics() {
    
    //SORTS DATA INTO SEASONS --->> POOR CHOICE FOR ITERATING
    //NEED MORE DISCRETE STRUCTURE. FILTER BY GAME & YEAR INSTEAD (ex: )
    const seasons = Object.entries(SEASONS)
        .map(([year, season]) => ({
            year: Number(year),
            leagueId: season.leagueId
        }))
        .filter(season => Boolean(season.leagueId))
        .sort((a, b) => a.year - b.year);
    
    const allTimeTeams = new Map();

    //may need to change to week/other var to iterate over
    for (const { year } of seasons) {
        const seasonData = await processWeeklyMatchupData(year);
        const teams = Object.values(seasonData);

        for (const team of teams) {
            const { roster_id, team_name, totals} = team; 

            if (!allTimeTeams.has(roster_id)) {
                allTimeTeams.set(roster_id, {
                    roster_id, 
                    team_name,
                    totals: {
                        wins: 0, 
                        losses: 0, 
                        pf: 0,
                        pa: 0
                    }
                });
            }
        
    

        const record = allTimeTeams.get(roster_id);

        record.totals.wins += totals.wins;
        record.totals.losses += totals.losses;
        record.totals.pf += totals.pf;
        record.totals.pa += totals.pa;
        }
    }
    const teamsArray = Array.from(allTimeTeams.values());

        //RETURNED AS IMPROPER DATA STRUCTURE



    calculateAllTimeWins(teamsArray);
    console.log(Array.from(teamsArray.values()));
    return Array.from(teamsArray.values()); 
}

//calculate all time records for each team
export function calculateAllTimeWins(teams) {

    console.log("Entered win tracker fn");

    for (const team of teams) {
        const gamesPlayed = 
            team.totals.wins + team.totals.losses;

        const winPercentage = 
            gamesPlayed > 0 
            ? (team.totals.wins / gamesPlayed).toFixed(3)
            : "0.0";

        // console.log({
        //     team: team.team_name,
        //     gamesPlayed,
        //     wins: team.totals.wins,
        //     losses: team.totals.losses,
        //     PF: team.totals.pf,
        //     PA: team.totals.pa,
        //     winPercentage
        // });
    }
}
