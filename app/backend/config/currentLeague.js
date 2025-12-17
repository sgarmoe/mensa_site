import "./loadEnv.js";
import { CURRENT_SEASON } from "./currentSeason.js";
import { LEAGUES } from "./leagues.js";

export const CURRENT_LEAGUE_ID = LEAGUES[CURRENT_SEASON];

console.log(CURRENT_SEASON);
console.log(LEAGUES)
console.log("Current ID: ", CURRENT_LEAGUE_ID);

if (!CURRENT_LEAGUE_ID) {
    throw new Error(`No league ID configured for ${CURRENT_SEASON}`);
}