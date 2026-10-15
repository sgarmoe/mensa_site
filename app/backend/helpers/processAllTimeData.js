import '../config/loadEnv.js';
import { SEASONS } from "../config/seasons.js";
import { processWeeklyMatchupData } from './processWeeklyMatchupData.js';

export async function calculateAllTimeStatistics() {

    const seasons = Object.entries(SEASONS)
        .map(([year, season]) => ({
            year: Number(year),
            leagueId: season.leagueId
        }))
        .filter(season => Boolean(season.leagueId))
        .sort((a, b) => a.year - b.year);
    
        //szn results 
    const seasonResults = await Promise.allSettled(
        seasons.map(({ year }) => processWeeklyMatchupData(year)) //all matchup data for each past season
    );

    const allSeasonData = seasonResults //unsure if needed? checks season after processing already occurred
        .filter((r, i) => {
            if (r.status === 'rejected') {
                console.warn(`Season ${seasons[i].year} failed to load:`, r.reason);
                return false;
            }
            return true;
        })
        .map(r => r.value);

    const allTimeTeams = new Map();

    for (const seasonData of allSeasonData) { //one season at a time
        for (const team of seasonData) {    //one team within one season 
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

            //adds total per season to record each iteration
        const record = allTimeTeams.get(roster_id);

        record.wins += (wins || 0);
        record.losses += (losses || 0);
        record.pf += (pf || 0);
        record.pa += (pa || 0);
        }
    }
    const teamsArray = Array.from(allTimeTeams.values());

    calculateAllTimeWins(teamsArray);
    return teamsArray;
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
