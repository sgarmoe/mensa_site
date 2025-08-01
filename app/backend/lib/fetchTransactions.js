import axios from 'axios';
import '../loadEnv.js';

const leagueId = process.env.LEAGUE_ID;
console.log("league ID: ", leagueId);
const transactions_url = `https://api.sleeper.app/v1/league/${leagueId}/transactions/1`
console.log(transactions_url);

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

fetchTransactions();


// if (import.meta.url === `file://${process.argv[1]}`) {
//   const data = await fetchTransactions();
//   console.dir(data, { depth: null });
// }
