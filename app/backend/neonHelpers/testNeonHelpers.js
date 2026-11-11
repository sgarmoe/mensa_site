import "../config/loadEnv.js";
import { processUserDataForNeon } from "./fetchUsersData.js";
import { processMatchupDataForNeon } from "./fetchRegMatchupData.js";
import { SEASONS } from "../config/seasons.js";
import { processPlayoffBracketForNeon } from "./fetchPlayoffMatchData.js";

const { leagueId } = SEASONS[2025];

async function testNeonProcessing(leagueId) {

    //TESTING USER PROCESSING
    // const usersById = await processUserDataForNeon(leagueId);
    // const users = Array.from(usersById.values());
    // console.log("User data for 2026", users);

    //TESTING REG MATCHUP PROCESSING
    // console.log("starting matchup raw data fetch");
    // const matchupRawData = await processMatchupDataForNeon(2026);
    // console.log("raw matchup data: ", matchupRawData[1]);


    //TESTING PLAYOFF DATA PROCESSING
    console.log("starting playoff data processing");
    const playoffData = await processPlayoffBracketForNeon(year);
    console.log(`Playoff data ${year}`, playoffData.processedWBracket);
    console.log(playoffData.processedLBracket);
}

const year = 2025;
testNeonProcessing(year).catch((error) => {
    console.error(`Failed to process ${year} playoff data:`, error);
    process.exitCode = 1;
});