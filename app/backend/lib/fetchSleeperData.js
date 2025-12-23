import axios from 'axios';

const BASE_URL = "https://api.sleeper.app/v1";

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

//can use to fetch prior years
export async function fetchAllMatchups(leagueId, week) {
      return axios
        .get(`${BASE_URL}/league/${leagueId}/matchups/${week}`)
        .then(res => res.data);
}