//convert transactions into readable info

import '../../backend/loadEnv.js';
import axios from 'axios';

import { displayPlayerNames, fetchUserTeamNames, fetchCurrentRosters } from "../../backend/api.js";
import { fetchTransactions } from "../../backend/lib/fetchTransactions.js";

export async function matchTransactionsToPlayers() {
    try {
        const transactions = await fetchTransactions();
        console.log("Ran fetch transactions");
        console.log(transactions[0]);
        
        for (const transaction of transactions) {
            const player = displayPlayerNames();
            console.log(player[0]);
        }

    }
    catch (error) {
        console.log("Error matching transaction IDs to player names");
        return [];
    }
}

matchTransactionsToPlayers();