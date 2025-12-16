import axios from 'axios';
import '../config/loadEnv.js';

const previousLeagueIds = [
    '1045634813593706496', 
    '986831949312446464'
];

export async function fetchPreviousPlayoffResults() {
    const results = [];

    try {
        for (const leagueId of previousLeagueIds) {
            const [winners, losers] = await Promise.all([
                await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/winners_bracket`),
                await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/losers_bracket`)
            ]);

            results.push({
                leagueId, 
                winners: winners.data,
                losers: losers.data
            });

            console.log("Data for League: ", leagueId);
            console.log("Winners bracket: ", winners.data);
            console.log("Loser's bracket: ", losers.data);
            return results;
        }
    } catch (error) {
        console.log("Error fetching previous playoff brackets: ", error);
    }
}
//fetchPreviousPlayoffResults();