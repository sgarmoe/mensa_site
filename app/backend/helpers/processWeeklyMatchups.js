import { fetchAllMatchups } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { LEAGUES } from "../config/leagues.js";


export async function processWeeklyMatchupData(year, week) {
    console.log("Data from Weekly matchup processor file");
    console.log("Year: ", year)
    console.log("Week: ", week);
    const leagueId = LEAGUES[year];
    console.log(leagueId);

    const allWeeks = week ? [week] : Array.from({ length : 14 }, (_, i) => i + 1); 
    console.log("All weeks: ", allWeeks);
    
    const weeklyMatchups = []; 
    const profiles = await matchRosterIdsToUser();  
    
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

        const teamAprofile = profiles.find(p => p.rosterId === teamA.roster_id);
        const teamBprofile = profiles.find(p => p.rosterId === teamB.roster_id);

        weeklyMatchups.push ({
            week: currentWeek, 
            matchup_id, 
            teams: {
                teamA: {
                    roster_id: teamA.roster_id, 
                    team_name: teamAprofile?.teamName ?? "No team name found",
                    points: teamA.points
                }, 
                teamB: {
                    roster_id: teamB.roster_id,
                    team_name: teamBprofile?.teamName ?? "No team name found",
                    points: teamB.points
                }
            },
            winner: 
                teamA.points > teamB.points
                    ? (teamAprofile?.teamName ?? "Unknown")
                    : (teamBprofile?.teamName ?? "Unknown"),
            loser:
                teamB.points < teamA.points
                    ? (teamBprofile?.teamName ?? "Unknown")
                    : (teamAprofile?.teamName ?? "Unknown"),
        });
        }
    }

    return weeklyMatchups;
}