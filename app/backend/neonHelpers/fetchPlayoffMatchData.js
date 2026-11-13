import { processPlayoffBrackets } from "../helpers/processPlayoffBrackets.js";
import { processPlayoffWeeklyMatchups } from "../helpers/processWeeklyMatchupData.js";

export async function processPlayoffBracketForNeon(year) {
    if (!Number.isInteger(Number(year)) || !year) {
        throw new Error("A valid league year is needed to fetch playoff data");
    }

    console.log("In processPlayoffDataForNeon ", year);

    //returns playoff bracket and podium dataa
    const playoffBracket = await processPlayoffBrackets(year);

    //returns scores and other playoff match data
    const playoffBracketScores = await processPlayoffWeeklyMatchups(year);

    if (!isRecord(playoffBracket)) {
        throw new Error("Invalid playoff data response: expected an object");
    }

    validateRoundMap(playoffBracket.processedWBracket, "processedWBracket");
    validateRoundMap(playoffBracket.processedLBracket, "processedLBracket");
    validateChampions(playoffBracket.champions);

    //need to combine data needed for Neon from the two playoff result objects

    combinePlayoffDataForNeon(playoffBracket, playoffBracketScores);

    return playoffBracket, playoffBracketScores;
}

function combinePlayoffDataForNeon(playoffBracket, playoffBracketScores) {
    const playoffBracketMap = new Map();
    // playoffBracket.forEach(({ matchId, team1, team2, isBye, winner, loser, rank }) => {
    //     playoffBracketMap.set()
    // });

    const playoffBracketScoresMap = new Map();

    console.log("logging playoff bracket WITHOUT SCORES", playoffBracket);
    console.log("logging bracket WITH SCORES: ", playoffBracketScores);

}


function isRecord(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateRoundMap(roundMap, name) {
    if (!isRecord(roundMap)) {
        throw new Error(`Invalid playoff data response: ${name} must be an object`);
    }

    for (const [round, matches] of Object.entries(roundMap)) {
        if (!Number.isInteger(Number(round)) || Number(round) < 1 || !Array.isArray(matches)) {
            throw new Error(
                `Invalid playoff data response: ${name} must map round numbers to match arrays`
            );
        }

        for (const match of matches) {
            if (
                !isRecord(match) ||
                !isRecord(match.team1) ||
                !isRecord(match.team2) ||
                !("matchId" in match) ||
                !("team1Score" in match) ||
                !("team2Score" in match) ||
                !("isBye" in match) ||
                !("winner" in match) ||
                !("loser" in match) ||
                !("rank" in match)
            ) {
                throw new Error(
                    `Invalid playoff data response: ${name} contains an invalid match in round ${round}`
                );
            }
        }

    }
}

function validateChampions(champions) {
    const placements = ["champion", "runnerUp", "thirdPlace", "toiletChamp"];
    if (!isRecord(champions)) {
        throw new Error("Invalid playoff data response: champions must be an object");
    }

    for (const placement of placements) {
        const team = champions[placement];
        if (
            !isRecord(team) ||
            typeof team.teamName !== "string" ||
            typeof team.displayName !== "string"
        ) {
            throw new Error(
                `Invalid playoff data response: champions.${placement} must contain teamName and displayName`
            );
        }
    }
}

function fetchScoresOfPlayoffMatchups() {

    
}