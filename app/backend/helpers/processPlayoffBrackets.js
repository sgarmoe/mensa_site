import { fetchWinnerPlayoffBracket, fetchLoserPlayoffBracket, fetchUserTeamNames } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { SEASONS } from "../config/seasons.js";

export async function processPlayoffBrackets(year) {

    const leagueId = SEASONS[year].leagueId;
    console.log(leagueId)
    const users = await matchRosterIdsToUser(leagueId);

    if (!SEASONS[year]) {
        throw new Error (`No year detected for ${year}`);
    }

    try {
        const wBracket = await fetchWinnerPlayoffBracket(leagueId);
        console.log("2026 winner's bracket raw data: ", wBracket);

        const lBracket = await fetchLoserPlayoffBracket(leagueId);
        //console.log("2026 loser's bracket raw data: ", lBracket);

        //matchPlayoffResultsToUser(wBracket, users);
        console.log("passed playoff processing fn");

        return {
            wBracket,
            lBracket
        }
    } catch (err) {
        console.warn(`Winner PB not found for ${year}`);
        return [];
    }

 
}

function matchPlayoffResultsToUser(bracket, users) {

    console.log("Print users: ", users);
    console.log("print winner bracket: ", bracket)

    for (const [playoff] of bracket.entries()) {
        const rosterId = users.find(user => user.rosterId);
        console.log("matching bracket ids to usernames");
        const teamsInRound = matchup.t1;
        console.log("teams: ", teamsInRound);
    }

}
