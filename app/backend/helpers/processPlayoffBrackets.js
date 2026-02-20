import { fetchWinnerPlayoffBracket, fetchLoserPlayoffBracket } from "../lib/fetchSleeperData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { SEASONS } from "../config/seasons.js";

export async function processPlayoffBrackets(year) {

    const leagueId = SEASONS[year].leagueId;
    console.log(leagueId)
    const profiles = await matchRosterIdsToUser(leagueId);

    if (!SEASONS[year]) {
        throw new Error (`No year detected for ${year}`);
    }

    try {
        const wBracket = await fetchWinnerPlayoffBracket(leagueId);
        console.log("2026 winner's bracket raw data: ", wBracket);

        const lBracket = await fetchLoserPlayoffBracket(leagueId);
        console.log("2026 loser's bracket raw data: ", lBracket);

        return {
            wBracket,
            lBracket
        }
    } catch (err) {
        console.warn(`Winner PB not found for ${year}`);
        return [];
    }

 
}
