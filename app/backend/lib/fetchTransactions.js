import axios from 'axios';
import '../config/loadEnv.js';

const leagueId = process.env.LEAGUE_ID;
const transactions_url = `https://api.sleeper.app/v1/league/${leagueId}/transactions/1`
const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters'
const users_url = 'https://api.sleeper.app/v1/league/1180198267141128192/users'

//fetch all FA and trades transactions 
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


//fetch users and their team names 
export async function fetchUserTeamNames() {
  try {
    const response = await axios.get(users_url) //call to Sleeper API for all users in the league
    return response.data;
  } catch (error) {
    console.error("Error fetching league's users", error);
  }
}


//fetch current league's rosters from Sleeper
export async function fetchCurrentRosters() {
  try {
    const response = await axios.get(roster_url);  //call to Sleeper for all rosters for each team in the league
    return response.data;
  } catch (error) {
    console.error('Error fetching rosters: ', error);
  }
}

