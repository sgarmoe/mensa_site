import { connectToDatabase } from './utils/mongoClient.js';
import axios from 'axios';
import { connect } from 'mongoose';

const uri = process.env.MONGODB_URI;
const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters'
const users_url = 'https://api.sleeper.app/v1/league/1180198267141128192/users'
const players_url = 'https://api.sleeper.app/v1/players/nfl';

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

//verify rosters fetched from Sleeper match with valid players in DB
export async function displayPlayerNames (playerIds, db) {
  try {
    const collection = db.collection('nfl_players'); 
    //console.log("Player IDs in the display player names function: ");
    //console.log(playerIds);
    const players = [];

    for (const playerId of playerIds) {
      const player = await collection.findOne({ player_id: playerId }); //for each player ID in Sleeper data, match with ID in mongo

      if (player) {   //push player info to store in players array for display 
        players.push({
          full_name: player.full_name,
          position: player.position, 
          team: player.team
          });
        //console.log(`Player ID: ${playerId}, Name: ${player.full_name}`);
      } else {
        //console.log(`Player ID: ${playerId} not found`);
      }
    }

    return players;

    } catch (error) {
      console.error('Error fetching player names: ', error);
      return [];
    }
  }


  //used for starters, taxi, and reserve
  //pass in playerIds of each group, match to IDs from mongo
  export async function displayStarters (playerIds, db) {
    try {
      const collection = db.collection('nfl_players');
      //console.log("Player IDs in the display starters function: ");
      //console.log(playerIds);
      const starters = [];

      if (!Array.isArray(playerIds) || playerIds.length === 0) {
        //console.warn('No player IDs in given array, returning empty array');
        return [];
      }

      for (const playerId of playerIds) {
        const player = await collection.findOne({ player_id: playerId }); //match sleeper IDs to mongo IDs
  
        if (player) {   //push relevant data points to array for storage
          starters.push({
            full_name: player.full_name,
            position: player.position, 
            team: player.team
            });
  
  
          //console.log(`Player ID: ${playerId}, Name: ${player.full_name}`);
        } else {
          //console.log(`Player ID: ${playerId} not found`);
        }
      }
  
      return starters;
  
      } catch (error) {
        console.error('Error fetching player names: ', error);
        return [];
      }
    }


//create bench from remaining players that did not populate into the other 3 categories
    export function createBench(roster) {
      try {
        const { starters, taxi, reserve, players } = roster;

         const nonBench = [
          ...starters,
          ...(reserve || []), //return empty in case IR is empty
          ...(taxi || []) //return empty in case taxi is empty
         ];
        const bench = players.filter(player => !nonBench.includes(player)); //bench = leftover players
        return bench;

      } catch (error) {
        console.log("Could not sort bench", error);
      }
    }


//function to call Sleeper API and overwrite MongoDB dataset
export async function fetchAndStoreNFLData() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('nfl_players');
      
        const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
        const playerData = response.data;

      if (typeof playerData === 'object' && playerData !== null) {
        const playersArray = Object.keys(playerData).map(playerId => ({
          _id: playerId,
          ...playerData[playerId]
        }));
        
  
        //clear prior data
        await collection.deleteMany({});
        console.log("Initial player data cleared");

        //insert new data into mongo
        await collection.insertMany(Object.values(playerData));
        console.log("Player data inserted");
      } else {
        console.log("No player data found/not in expected format");
      }
    } catch(error) {
        console.error('Did not fetch or store data: ', error);
    }
}
