import '../config/loadEnv.js';
import { SEASONS } from "../config/seasons.js";
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
            const { roster_id, team_name, wins, losses, pf, pa } = team; 

            if (!allTimeTeams.has(roster_id)) {
                allTimeTeams.set(roster_id, {
                    roster_id, 
                    team_name,
                    wins: 0, 
                    losses: 0, 
                    pf: 0,
                    pa: 0
                });
            }

        const record = allTimeTeams.get(roster_id);

        record.wins += (wins || 0);
        record.losses += (losses || 0);
        record.pf += (pf || 0);
        record.pa += (pa || 0);
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
            team.wins + team.losses;

        const winPercentage = 
            gamesPlayed > 0 
            ? (team.wins / gamesPlayed).toFixed(3)
            : "0.0";
    }
}
