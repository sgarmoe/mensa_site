//convert transactions into readable info

//THIS FILE NEEDS OVERHAULED = IGNORED FOR NOW
//SHOULD BE FOR DISPLAY ONLY - LOGIC GOES IN LIB BACKEND
//processed transactions are PASSED here for rendering in home page

import '../../backend/config/loadEnv.js';
import axios from 'axios';

import { displayPlayerNames } from '../../backend/lib/fetchMongoNFLData.js';
import { fetchUserTeamNames, fetchCurrentRosters } from '../../backend/lib/fetchSleeperData.js';
import { fetchTransactions } from "../../backend/lib/fetchTransactions.js";
import { connectToDatabase } from '../../backend/config/mongoClient.js';



export async function matchTransactionsToPlayers() {
    try {
        const db = await connectToDatabase();
        const transactions = await fetchTransactions();
        console.log("Fetched transactions", transactions.length);

        const formattedTransactions = [];
        

    }
    catch (error) {
        console.log("Error matching transaction IDs to player names");
        return [];
    }
}
