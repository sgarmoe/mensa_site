//MONGO DB SETUP 

const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios');

const uri = "mongodb+srv://samgarmoe:RMNh3YV1GOiHouua@cluster0.lu9fe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const roster_url = 'https://api.sleeper.app/v1/league/1045634813593706496/rosters'


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

    //const players = await retrievePlayerData();

    //fetch current roster for each team 
    const rosters = await fetchRostersAndPlayers();
   
    for (const roster of rosters) {
      console.log(`Processing roster for owner ${roster.owner_id}`);
      await displayPlayerNames(roster.players); //print player name and ID for each team's roster
    }

  } finally {
    await client.close(); //close connection to mongo
  }
}
run().catch(console.dir);



//fetch current league's rosters from Sleeper
async function fetchRostersAndPlayers() {
  try {
    const response = await axios.get(roster_url);
    const rosters = response.data;

    const rostersWithPlayers = await Promise.all(
      rosters.map(async (roster) => {
        const players = await displayPlayerNames(roster.players);
        return {
          name: `Team ${roster.roster_id}`,
          players: players, //array of: id, name
        };
      })
    );

    return rostersWithPlayers;
  } catch (error) {
    console.error('Error fetching rosters: ', error);
  }
}

//display name and IDs of all rostered players
async function displayPlayerNames (playerIds) {
  try {
    const db = client.db('nfl_data');
    const collection = db.collection('nfl_players');
    const players = [];

    for (const playerId of playerIds) {
      const player = await collection.findOne({ player_id: playerId });


      if (player) {
        players.push({ id: playerId, name: player.full_name});
      } else {
        players.push({ id: playerId, name: 'Not found'});

      }
    }
    return players;
    } catch (error) {
      console.error('Error fetching player names: ', error);
    }
  }


//testing connection to database
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
module.exports = { retrievePlayerData };


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