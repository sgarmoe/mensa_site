import "./loadEnv.js";
import { CURRENT_SEASON } from "./currentSeason.js";
import { SEASONS } from "./seasons.js";

export const CURRENT_LEAGUE_ID = SEASONS[CURRENT_SEASON];

console.log(CURRENT_SEASON);
console.log(SEASONS)
console.log("Current ID: ", CURRENT_LEAGUE_ID);

if (!CURRENT_LEAGUE_ID) {
    throw new Error(`No league ID configured for ${CURRENT_SEASON}`);
}