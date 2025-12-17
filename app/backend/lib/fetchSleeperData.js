import axios from 'axios';
import '../config/loadEnv.js';

const BASE_URL = "https://api.sleeper.app/v1";
const uri = process.env.MONGODB_URI;
//const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters'
//const users_url = 'https://api.sleeper.app/v1/league/1180198267141128192/users'
const players_url = 'https://api.sleeper.app/v1/players/nfl';
//const transactions_url = 'https://api.sleeper.app/v1/league/1180198267141128192/transactions/11'


//fetch users and their team names 
export async function fetchUserTeamNames(leagueId) {
  return axios 
    .get(`${BASE_URL}/league/${leagueId}/users`)
    .then(res => res.data);
}

//fetch current league's rosters from Sleeper
export async function fetchCurrentRosters(leagueId) {
  return axios
    .get(`${BASE_URL}/league/${leagueId}/rosters`)
    .then(res => res.data);
}

//fetch all FA and trades transactions 
export async function fetchTransactions (leagueId, week){ 
    return axios
      .get(`${BASE_URL}/league/${leagueId}/transactions/${week}`)
      .then(res => res.data); 
}


export async function fetchAllMatchups(leagueId, totalWeeks = 14) {
  return Promise.all(
    Array.from({ length: totalWeeks }, (_, i) => {
      const week = i + 1;
      return axios
        .get(`${BASE_URL}/league/${leagueId}/matchups/${week}`)
        .then(res => res.data);
    })
  );
}


