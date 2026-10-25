import "../config/loadEnv.js";
import { processUserDataForNeon } from "./fetchUsersData.js";
import { SEASONS } from "../config/seasons.js";

const { leagueId } = SEASONS[2026];

async function testNeonProcessing() {
    const usersById = await processUserDataForNeon(leagueId);
    const users = Array.from(usersById.values());
    console.log("User data for 2026", users);
}

testNeonProcessing().catch((error) => {
    console.error("Failed to process 2026 user data:", error);
    process.exitCode = 1;
});