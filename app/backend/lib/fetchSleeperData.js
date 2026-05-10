import axios from 'axios';

const sleeperClient = axios.create({
    baseURL: "https://api.sleeper.app/v1",
    timeout: 10000,
});

export async function fetchUserTeamNames(leagueId) {
  return sleeperClient
    .get(`/league/${leagueId}/users`)
    .then(res => res.data);
}

export async function fetchCurrentRosters(leagueId) {
  return sleeperClient
    .get(`/league/${leagueId}/rosters`)
    .then(res => res.data);
}

export async function fetchTransactions(leagueId, week) {
    return sleeperClient
      .get(`/league/${leagueId}/transactions/${week}`)
      .then(res => res.data);
}

export async function fetchAllMatchups(leagueId, week) {
    return sleeperClient
        .get(`/league/${leagueId}/matchups/${week}`)
        .then(res => res.data);
}

export async function fetchSpecificLeagueSettings(leagueId) {
    return sleeperClient
      .get(`/league/${leagueId}`)
      .then(res => res.data);
}

export async function fetchWinnerPlayoffBracket(leagueId) {
  return sleeperClient
    .get(`/league/${leagueId}/winners_bracket`)
    .then(res => res.data);
}

export async function fetchLoserPlayoffBracket(leagueId) {
  return sleeperClient
    .get(`/league/${leagueId}/losers_bracket`)
    .then(res => res.data);
}
