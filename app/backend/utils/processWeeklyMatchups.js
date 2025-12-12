import { fetchAllMatchups } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";

export async function processWeeklyMatchupData() {
    const matchupsArray = await fetchAllMatchups();
    const profiles = await matchRosterIdsToUser();

    const weeklyMatchups = []; 

    for (const { week, matchups } of matchupsArray) {
           const matchupMap = new Map();

           for (const entry of matchups) {
            const id = entry.matchup_id;

            if (!matchupMap.has(id)) {
                matchupMap.set(id, []);
            }

            matchupMap.get(id).push(entry);
           }
    
    for (const [matchup_id, teams] of matchupMap.entries()) {
        if (teams.length !== 2) continue; 

        const [teamA, teamB] = teams;

        const teamAprofile = profiles.find(p => p.rosterId === teamA.roster_id);
        const teamBprofile = profiles.find(p => p.rosterId === teamB.roster_id);

        const game = {
            week, 
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
        };

        weeklyMatchups.push(game);
        }
    }
    //console.log(weeklyMatchups[45]);
    return weeklyMatchups;
}
processWeeklyMatchupData();