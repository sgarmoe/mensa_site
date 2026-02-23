import { fetchWinnerPlayoffBracket, fetchLoserPlayoffBracket, fetchUserTeamNames } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { SEASONS } from "../config/seasons.js";

export async function processPlayoffBrackets(year) {

    const leagueId = SEASONS[year].leagueId;
    if (!leagueId) throw new Error(`No year detected for ${year}`);
    const rosterMap = await matchRosterIdsToUser(leagueId);

    try {
        const wBracket = await fetchWinnerPlayoffBracket(leagueId);
        const lBracket = await fetchLoserPlayoffBracket(leagueId);
        
        const processedWBracket = matchPlayoffResultsToUser(wBracket, rosterMap);
        const processedLBracket = matchPlayoffResultsToUser(lBracket, rosterMap);

        console.log("Winners bracket: ", processedWBracket);
        console.log("Losers bracket: ", processedLBracket);

        return {
            processedLBracket, 
            processedWBracket
        }

    } catch (err) {
        console.warn(`Winner PB not found for ${year}`);
        return { processedWBracket: [], processedLBracket: [] };
    }
}

function matchPlayoffResultsToUser(bracket, rosterMap) {

    const rounds = {};

    const getTeam = (rosterId) => {
        if (!rosterId) return { teamName: "Not found" , displayName: "not found"}
        return rosterMap.get(rosterId) || { teamName: "Unknown", displayName: "Unknown" };
    };
  

    bracket.forEach(match => {
        const roundNum = match.r;
        if (!rounds[roundNum]) rounds[roundNum] = [];
            rounds[roundNum].push({
            matchId: match.m,
            team1: getTeam(match.t1),
            team2: getTeam(match.t2),
            isBye: roundNum === 1 && match.t1 && !match.t2 && !match.t2_from,
            winner: match.w,
            loser: match.l,
            rank: match.p
        });
    })
    return rounds;
}
