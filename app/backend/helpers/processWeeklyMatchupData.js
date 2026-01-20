import { fetchAllMatchups } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { SEASONS } from "../config/seasons.js";

export async function processWeeklyMatchupData(year) {

    const week = 0;
    const { leagueId, regularWeeks } = SEASONS[year];
    const allWeeks = week ? [week] : Array.from({ length : regularWeeks }, (_, i) => i + 1); 
    const teamHistory = new Map();
    const profiles = await matchRosterIdsToUser(leagueId);  

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
        let matchups;

        try {
            matchups = await fetchAllMatchups(leagueId, currentWeek);
        } catch (err) {
            console.warn(`No matchups available for ${year}`);
            continue;
        }
        
        if (!Array.isArray(matchups) || matchups.length === 0) {
            continue;
        }
        
        const matchupMap = new Map();
    

        for (const entry of matchups) {
        const matchupId = entry.matchup_id;

            if (!matchupMap.has(matchupId)) {
                matchupMap.set(matchupId, []);
            }
            matchupMap.get(matchupId).push(entry);
        }

            const firstMatchup = matchupMap.entries().next().value;

        if (firstMatchup) {
            const [matchup_id, teams] = firstMatchup;

            console.log(
                `RAW Sleeper matchup — week ${currentWeek}, matchup ${matchup_id}, year ${year}}`

            );
        console.log(teams[0].starters_points);
        }
    
    for (const [matchup_id, teams] of matchupMap.entries()) {
        if (teams.length !== 2) continue; 

        const [teamA, teamB] = teams;

        const teamAName = profiles.get(teamA.roster_id);
        const teamBName = profiles.get(teamB.roster_id);

        storeTeamResults(teamA.roster_id);
        storeTeamResults(teamB.roster_id);

        const teamARecord = teamHistory.get(teamA.roster_id);
        const teamBRecord = teamHistory.get(teamB.roster_id);

        const teamAPoints = Number(teamA.points) || 0;
        const teamBPoints = Number(teamB.points) || 0;

        teamARecord.totals.pf+= teamAPoints;
        teamARecord.totals.pa+= teamBPoints;

        teamBRecord.totals.pf+= teamBPoints;
        teamBRecord.totals.pa+= teamAPoints;

        let resultA, resultB;

        if (teamAPoints > teamBPoints) {
            teamARecord.totals.wins++;
            teamBRecord.totals.losses++;
            resultA = 'win';
            resultB = 'loss';
        } else if (teamBPoints > teamAPoints) {
            teamARecord.totals.losses++;
            teamBRecord.totals.wins++;
            resultA = 'loss';
            resultB = 'win';
        } else {
            resultA = 'tie';
            resultB = 'tie';
        }

         teamARecord.games.push({
            year, 
            week: currentWeek, 
            matchup_id, 
            opponent_roster_id: teamB.roster_id, 
            opponent_name: teamBName,
            pf: teamAPoints,
            pa: teamBPoints,
            result: resultA
        });


        teamBRecord.games.push({
            year, 
            week: currentWeek, 
            matchup_id, 
            opponent_roster_id: teamA.roster_id, 
            opponent_name: teamAName,
            pf: teamBPoints,
            pa: teamAPoints,
            result: resultB
        });

        }
    }

    // for (const [roster_id, team] of teamHistory.entries()) {
    //     console.log(`Team ${team.team_name}, year: ${year}`);

    //     for (const game of team.games) {
    //         console.log(
    //             `Week ${game.week} vs. ${game.opponent_name}` +
    //             `PF: ${game.pf} PA: ${game.pa} Result: ${game.result}`
    //         );
    //     }
    // }

    if (teamHistory.size === 0) {
        return [];
    }
    return Array.from(teamHistory.values());
}