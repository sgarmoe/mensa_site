import axios from 'axios';

export async function fetchPreviousPlayoffResults(leagueId) {

    try {
        for (const leagueId of previousLeagueIds) {
            const [winners, losers] = await Promise.all([
                await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/winners_bracket`),
                await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/losers_bracket`)
            ]);

            console.log("Data for League: ", leagueId);
            console.log("Winners bracket: ", winners.data);
            console.log("Loser's bracket: ", losers.data);

            return {
                leagueId, 
                winners: winners.data,
                losers: losers.data
            };   
        }
    } catch (error) {
        console.log("Error fetching previous playoff brackets: ", error);
        throw error;
    }
}
//fetchPreviousPlayoffResults();