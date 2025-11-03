//use to house logic for fetching all Sleeper data EXCEPT current nfl list from sleeper

import axios from 'axios';
import '../config/loadEnv.js';

const leagueId = process.env.LEAGUE_ID;
const transactions_url = `https://api.sleeper.app/v1/league/${leagueId}/transactions/1`


export async function fetchTransactions (){ 
    try {
        const response = await axios.get(transactions_url);
        console.log("received response");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions", error);
    }
}

