import axios from 'axios';
import '../config/loadEnv.js';

const BASE_URL = "https://api.sleeper.app/v1";
const leagueId = process.env.LEAGUE_ID;
const uri = process.env.MONGODB_URI;
const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters'
const users_url = 'https://api.sleeper.app/v1/league/1180198267141128192/users'
const players_url = 'https://api.sleeper.app/v1/players/nfl';
const transactions_url = 'https://api.sleeper.app/v1/league/1180198267141128192/transactions/11'


//fetch users and their team names 
export async function fetchUserTeamNames(leagueId) {
  try {
    const response = await axios.get(`${BASE_URL}/leaguea/${leagueId}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching league's users", error);
  }
}

//fetch current league's rosters from Sleeper
export async function fetchCurrentRosters() {
  try {
    const response = await axios.get(roster_url); 
    return response.data;
  } catch (error) {
    console.error('Error fetching rosters: ', error);
  }
}

//fetch all FA and trades transactions 
export async function fetchTransactions (){ 
    try {
        const response = await axios.get(transactions_url);
        console.log("received response");
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions", error);
    }
}


export async function fetchAllMatchups(leagueId, totalWeeks = 14) {
  const requests = Array.from({ length : totalWeeks }, (_, i) => {
    const week = i + 1;
    const url = `https://api.sleeper.app/v1/league/1180198267141128192/matchups/${week}`;
    return axios.get(url).then(res => ({ week, matchups: res.data }));
  });
  const results = await Promise.all(requests);
  return results;
}
