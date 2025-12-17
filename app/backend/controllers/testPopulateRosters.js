import '../config/loadEnv.js';

import axios from 'axios';
import { connectToDatabase } from '../config/mongoClient.js';
import { populateIR, populateBench, populateStarters, populateTaxi } from '../helpers/populateRosters.js';

async function testPopulateRosters() {
    try {
        console.log("Connecting to mongo");
        await connectToDatabase();

        console.log("Getting rosters from sleeper");
        const response = await axios.get(roster_url);
        const rosters = response.data;

        if (!Array.isArray(rosters) || rosters.length == 0) {
            console.log("Error fetching rosters: ", error);
            return [];
        }

        for (const [index, roster] of rosters.entries()) {

        const injuredReserve = await populateIR(roster.reserve);
        const starters = await populateStarters(roster.starters);
        const taxi = await populateTaxi(roster.taxi);
        const bench = await populateBench(roster);


        
        // console.log("IR: ", injuredReserve);
        console.log("Starters: ", starters);
        // console.log("Bench: ", bench);
        // console.log("Taxi: ", taxi);
        }


    } catch (error) {
        console.log("Error testing roster population: ", error);
    } finally {
        process.exit(0);
    }

}

testPopulateRosters(2025);