//MONGO DB SETUP 

const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios');

const uri = "mongodb+srv://samgarmoe:RMNh3YV1GOiHouua@cluster0.lu9fe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const roster_url = 'https://api.sleeper.app/v1/league/1045634813593706496/rosters'
const users_url = 'https://api.sleeper.app/v1/league/1045634813593706496/users'


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  //connect to mongoDB 

    await client.connect();
   // console.log("Connected to MongoDB");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



//fetch users and their team names 
export async function fetchUserTeamNames() {
  try {
    const response = await axios.get(users_url)
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

export async function displayPlayerNames (playerIds, db) {
  try {
    const collection = db.collection('nfl_players');
    //console.log("Player IDs in the display player names function: ");
    //console.log(playerIds);
    const players = [];

    for (const playerId of playerIds) {
      const player = await collection.findOne({ player_id: playerId });

      if (player) {
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


  export async function displayStarters (playerIds, db) {
    try {
      const collection = db.collection('nfl_players');
      //console.log("Player IDs in the display starters function: ");
      //console.log(playerIds);
      const starters = [];

      if (!Array.isArray(playerIds) || playerIds.length === 0) {
        console.warn('No player IDs in given array, returning empty array');
        return [];
      }

      for (const playerId of playerIds) {
        const player = await collection.findOne({ player_id: playerId });
  
        if (player) {
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



    export function createBench(roster) {
      try {
        const { starters, taxi, reserve, players } = roster;

         const nonBench = [
          ...starters,
          ...(reserve || []),
          ...(taxi || [])
         ];

        //  if (!Array.isArray(reserve)) {
        //   console.error('playerIds is not an array', reserve);
        //   return [];
        //}


        const bench = players.filter(player => !nonBench.includes(player));
        return bench;

      } catch (error) {
        console.log("Could not sort bench", error);
      }
    }

  
async function retrievePlayerData() {
  try {
    const db = client.db('nfl_data');
    const collection = db.collection('nfl_players');

    const players = await collection.find().limit(100).toArray();
    return players;

  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}


//function to call Sleeper API and overwrite MongoDB dataset
async function fetchAndStoreNFLData() {
    try {
        const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
        const playerData = response.data;

      if (typeof playerData === 'object' && playerData !== null) {
        const playersArray = Object.keys(playerData).map(playerId => ({
          _id: playerId,
          ...playerData[playerId]
        }));
        
        
        const db = client.db('nfl_data');
        const collection = db.collection('nfl_players');
      
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


//use to verify that all mongo databases are accounted for
async function listDatabases(client) {
    
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases: ");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}