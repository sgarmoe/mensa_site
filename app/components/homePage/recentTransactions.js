//convert transactions into readable info

//THIS FILE NEEDS OVERHAULED = IGNORED FOR NOW
//SHOULD BE FOR DISPLAY ONLY - LOGIC GOES IN LIB BACKEND
//processed transactions are PASSED here for rendering in home page

import '../../backend/loadEnv.js';
import axios from 'axios';

import { displayPlayerNames, fetchUserTeamNames, fetchCurrentRosters } from "../../backend/api.js";
import { fetchTransactions } from "../../backend/lib/fetchTransactions.js";
import { connectToDatabase } from '../../backend/utils/mongoClient.js';



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

matchTransactionsToPlayers();