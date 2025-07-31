//fetch FA add/drop & trades

import axios from 'axios';

const leagueId = process.env.LEAGUE_ID;
const transactions_url = "https://api.sleeper.app/v1/league/<leagueId>/transactions"


export async function fetchTransactions (){ 
    try {
        const response = axios.get(transactions_url);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions", error);
    }
}