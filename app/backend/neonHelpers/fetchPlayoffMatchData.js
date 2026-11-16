import { processPlayoffBrackets } from "../helpers/processPlayoffBrackets.js";
import { processPlayoffWeeklyMatchups } from "../helpers/processWeeklyMatchupData.js";

export async function processPlayoffBracketForNeon(year) {
    const leagueYear = Number(year);
    if (!Number.isInteger(leagueYear) || leagueYear < 1) {
        throw new Error("A valid league year is needed to fetch playoff data");
    }

    const [playoffBracket, playoffBracketScores] = await Promise.all([
        processPlayoffBrackets(year),
        processPlayoffWeeklyMatchups(year)
    ]);

    if (!isRecord(playoffBracket)) {
        throw new Error("Invalid playoff data response: expected an object");
    }

    validateRoundMap(playoffBracket.processedWBracket, "processedWBracket");
    validateRoundMap(playoffBracket.processedLBracket, "processedLBracket");
    validateChampions(playoffBracket.champions);

    const rows = combinePlayoffDataForNeon(
        playoffBracket,
        playoffBracketScores,
        leagueYear
    );

    return { playoffBracket, playoffBracketScores, rows };
}

function combinePlayoffDataForNeon(playoffBracket, playoffBracketScores, year) {
    if (!Array.isArray(playoffBracketScores)) {
        throw new Error("Invalid playoff scores response: expected an array");
    }

    const pairKey = (rosterId, opponentRosterId) =>
        JSON.stringify([String(rosterId), String(opponentRosterId)]);
    const gamesByPair = new Map();

    for (const team of playoffBracketScores) {
        if (!isRecord(team) || !Array.isArray(team.games)) {
            throw new Error("Invalid playoff scores response: each team must contain a games array");
        }

        for (const game of team.games) {
            if (
                !isRecord(game) ||
                game.roster_id == null ||
                game.opponent_roster_id == null ||
                !Number.isFinite(game.pf)
            ) {
                throw new Error("Invalid playoff scores response: each game must contain roster IDs and a numeric score");
            }

            const key = pairKey(game.roster_id, game.opponent_roster_id);
            if (gamesByPair.has(key)) {
                throw new Error(
                    `Invalid playoff scores response: multiple games found for roster pair ${key}`
                );
            }
            gamesByPair.set(key, game);
        }
    }

    const rows = [];
    const brackets = [
        ["winner", playoffBracket.processedWBracket],
        ["loser", playoffBracket.processedLBracket]
    ];

    for (const [bracketType, rounds] of brackets) {
        for (const [round, matches] of Object.entries(rounds)) {
            for (const match of matches) {
                const team1RosterId = match.team1.roster_id;
                const team2RosterId = match.team2.roster_id;
                const team1Game = team2RosterId == null
                    ? undefined
                    : gamesByPair.get(pairKey(team1RosterId, team2RosterId));
                const team2Game = team1RosterId == null
                    ? undefined
                    : gamesByPair.get(pairKey(team2RosterId, team1RosterId));

                rows.push({
                    year,
                    bracket_type: bracketType,
                    round: Number(round),
                    match_id: match.matchId,
                    team1: match.team1,
                    team2: match.team2,
                    team1_score: team1Game?.pf ?? match.team1Score ?? null,
                    team2_score: team2Game?.pf ?? match.team2Score ?? null,
                    winner: match.winner,
                    loser: match.loser,
                    rank: match.rank,
                    is_bye: match.isBye
                });
            }
        }
    }

    return rows;
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
