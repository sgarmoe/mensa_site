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
    
    const allSeasonData = await Promise.all(
        seasons.map(({ year }) => processWeeklyMatchupData(year))
    );

    const allTimeTeams = new Map();

    for (const seasonData of allSeasonData) {
        const teams = Object.values(seasonData);

        for (const team of teams) {
            const { roster_id, team_name, avatar, wins, losses, pf, pa } = team;

            if (!allTimeTeams.has(roster_id)) {
                allTimeTeams.set(roster_id, {
                    roster_id,
                    team_name,
                    avatar,
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
    //console.log(Array.from(teamsArray.values()));
    return Array.from(teamsArray.values()); 
}

//calculate all time records for each team
export function calculateAllTimeWins(teams) {
    for (const team of teams) {
        const gamesPlayed = team.wins + team.losses;
        team.winPercentage = gamesPlayed > 0
            ? (team.wins / gamesPlayed).toFixed(3)
            : "0.000";
    }
}
