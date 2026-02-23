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

        const champions = getLeagueWinners(processedWBracket, processedLBracket, rosterMap);

        console.log(champions);

        return {
            processedLBracket, 
            processedWBracket,
            champions
        }

    } catch (err) {
        console.warn("Error: ", err);
        return { 
            processedWBracket: [], 
            processedLBracket: [],
            champions: {
                champion: null,
                toiletChamp: null
            }
        };
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

function getLeagueWinners(processedWBracket, processedLBracket, rosterMap) {

    const winnerMatches = Object.values(processedWBracket).flat();
    const championship  = winnerMatches.find(m => m.rank === 1);

    const loserMatches = Object.values(processedLBracket).flat();
    const toiletChampionship = loserMatches.find(m => m.rank === 1);

    const getTeam = (rosterId) => {
        if (!rosterId) return { teamName: "Not found" , displayName: "not found"}
        return rosterMap.get(rosterId) || { teamName: "Unknown", displayName: "Unknown" };
    };


    return {
        champion: getTeam(championship?.winner) || "Champ not found", 
        runnerUp: getTeam(championship?.loser) || "runner up not found",
        toiletChamp: getTeam(toiletChampionship?.winner) || "toilet champ not found"
    };
}

