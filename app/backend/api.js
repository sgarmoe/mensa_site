import { connectToDatabase } from './config/mongoClient.js';
import axios from 'axios';
import { connect } from 'mongoose';

const uri = process.env.MONGODB_URI;
const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters'
const users_url = 'https://api.sleeper.app/v1/league/1180198267141128192/users'
const players_url = 'https://api.sleeper.app/v1/players/nfl';


//MOVE TO UTILS
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



  //MOVE TO UTILS
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



    //MOVE TO UTILS
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
