import { populateAllRosters } from "./populateRostersController.js";
import '../config/loadEnv.js';

async function testPopulate() { 
    console.log("starting test");
    const result = await populateAllRosters(2025);

    console.log("Test complete");
    console.log("Number of rosters: ", result.length);

    result.forEach((r, i) => {
        console.log(`\n--- Roster #${i + 1} ---`);
        console.log("Owner: ", r.owner_id);
        console.log("Team name" , r.team_name);
        console.log("Starters: ", r.starters);
        console.log("Bench: ", r.bench);
        console.log("Taxi: ", r.taxi);
        console.log("IR: ", r.injuredReserve);

    });
}


testPopulate()
    .then(() => console.log("Test complete"))
    .catch(err => console.error("Error with test: ", err));
