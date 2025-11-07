// import dotenv from 'dotenv';
// dotenv.config();
import '../config/loadEnv.js';

import axios from 'axios';
import { connectToDatabase } from '../config/mongoClient.js';
import { populateIR, populateBench, populateStarters, populateTaxi } from '../utils/populateRosters.js';

const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters';

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

        const firstRoster = rosters[0];
        console.log(firstRoster.players);


        
        const injuredReserve = await populateIR(firstRoster.players);
        const starters = await populateStarters(firstRoster);
        const taxi = await populateTaxi(firstRoster);
        const bench = await populateBench(firstRoster);

        console.log("IR: ", injuredReserve);
        console.log("Starters: ", starters);
        console.log("Bench: ", bench);
        console.log("Taxi: ", taxi);


    } catch (error) {
        console.log("Error testing roster population: ", error);
    } finally {
        process.exit(0);
    }

}

testPopulateRosters();