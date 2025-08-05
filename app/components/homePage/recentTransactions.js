//convert transactions into readable info

import '../../backend/loadEnv.js';
import axios from 'axios';

import { displayPlayerNames, fetchUserTeamNames, fetchCurrentRosters } from "../../backend/api.js";
import { fetchTransactions } from "../../backend/lib/fetchTransactions.js";
import { connectToDatabase } from '../../backend/utils/mongoClient.js';


async function getUsers() {
    const db = await connectToDatabase();
    console.log("Connected to DB:", db.databaseName);
    const users = await db.collection('users').find().toArray();
    return users;
}

export async function matchTransactionsToPlayers() {
    try {
        const db = await connectToDatabase();
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

//getUsers();
matchTransactionsToPlayers();