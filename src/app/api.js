//MONGO DB SETUP 

const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios');

const uri = "mongodb+srv://samgarmoe:RMNh3YV1GOiHouua@cluster0.lu9fe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    console.log("Connected to MongoDB");
    await retrievePlayerData();

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



async function retrievePlayerData() {
  try {
    const db = client.db('nfl_data');
    const collection = db.collection('nfl_players');

    const players = await collection.find().limit(5).toArray();
    return players;
    //console.log("100 players: ");   //TESTING ACCESS TO MONGO 
    //players.forEach(player => console.log(player));
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
        const db = client.db('nfl_data');
        const collection = db.collection('nfl_players');
      
        await collection.deleteMany({});
        console.log("Initial player data cleared");

        await collection.insertMany(Object.values(playerData));
        console.log("Player data inserted");
      } else {
        console.log("No player data found/not in expexted format");
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