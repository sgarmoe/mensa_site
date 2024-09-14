//MONGO DB SETUP 

const mongoose = require('mongoose');
const axios = require('axios');


const uri = "mongodb+srv://samgarmoe:RMNh3YV1GOiHouua@cluster0.lu9fe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


//choosing which data points are saved into mongo
const playerSchema = new mongoose.Schema({ 
  player_id: {type: Number, required: true},
  fantasy_positions: {type: String, required: true},
  search_full_name: {type: String, required: true}
}) 

const Player = mongoose.model('Player', playerSchema);


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function run() {
  try {
  //connect to mongoDB using mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    //this is the one to use once a day maximum
    await fetchAndStoreNFLData(); // CALL TO SLEEPER FOR ALL NFL DATA

    await listDatabases();
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.connection.close();
  }
}
run().catch(console.dir);


async function listDatabases() {
    const admin = mongoose.connection.db.admin();
    const databasesList = await admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function fetchAndStoreNFLData() {
    try {
        const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
        const playerData = response.data;

        await Player.deleteMany({});
        console.log("Initial player data cleared");
        await Player.insertMany({});
        console.log("Player data inserted");
    } catch(error) {
        console.error('Did not fetch or store data: ');
    }
}