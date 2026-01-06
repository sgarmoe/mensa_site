import { fetchAllMatchups } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { SEASONS } from "../config/seasons.js";

export async function processWeeklyMatchupData(year) {

    const week = 0;
    const { leagueId, regularWeeks } = SEASONS[year];
    const allWeeks = week ? [week] : Array.from({ length : 14 }, (_, i) => i + 1); 
    const teamHistory = new Map();
    const profiles = await matchRosterIdsToUser();  

    function storeTeamResults(roster_id) {
        if (!teamHistory.has(roster_id)) {
            teamHistory.set(roster_id, {
                roster_id, 
                team_name: profiles.get(roster_id) ?? "Unknown Team",
                games: [], 
                totals: {
                    wins: 0,
                    losses: 0, 
                    pf: 0, 
                    pa: 0
                }
            });
        }
    }
    
    for (const currentWeek of allWeeks) {
        const matchups = await fetchAllMatchups(leagueId, currentWeek);
        
        const matchupMap = new Map();

        for (const entry of matchups) {
        const matchupId = entry.matchup_id;

            if (!matchupMap.has(matchupId)) {
                matchupMap.set(matchupId, []);
            }
            matchupMap.get(matchupId).push(entry);
        }
    
    for (const [matchup_id, teams] of matchupMap.entries()) {
        if (teams.length !== 2) continue; 

        const [teamA, teamB] = teams;

        const teamAName = profiles.get(teamA.roster_id);
        const teamBName = profiles.get(teamB.roster_id);

        storeTeamResults(teamA.roster_id);
        storeTeamResults(teamB.roster_id);

        const teamAWin = teamA.points > teamB.points;
        const teamBWin = teamB.points > teamA.points;

        const teamARecord = teamHistory.get(teamA.roster_id);
        const teamBRecord = teamHistory.get(teamB.roster_id);

        teamARecord.games.push({
            year, 
            week: currentWeek, 
            matchup_id, 
            opponent_roster_id: teamB.roster_id, 
            opponent_name: teamBName,
            pf: teamA.points,
            pa: teamB.points,
            result: teamAWin ? "win" : "loss"
        });


        teamBRecord.games.push({
            year, 
            week: currentWeek, 
            matchup_id, 
            opponent_roster_id: teamA.roster_id, 
            opponent_name: teamAName,
            pf: teamB.points,
            pa: teamA.points,
            result: teamBWin ? "win" : "loss"
        });

        teamARecord.totals.pf+= teamA.points;
        teamARecord.totals.pa+= teamB.points;

        teamBRecord.totals.pf+= teamB.points;
        teamBRecord.totals.pa+= teamA.points;

        if (teamAWin) {
            teamARecord.totals.wins++;
            teamBRecord.totals.losses++;
        } else {
            teamARecord.totals.losses++;
            teamBRecord.totals.wins++;
        }

        }
    }
    return Object.fromEntries(teamHistory);
}