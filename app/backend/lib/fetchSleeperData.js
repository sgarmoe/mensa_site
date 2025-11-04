//use to house logic for fetching all Sleeper data EXCEPT current nfl list from sleeper

import axios from 'axios';
import '../config/loadEnv.js';

const leagueId = process.env.LEAGUE_ID;

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

