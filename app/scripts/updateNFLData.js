// scripts/updateNFLData.js
import { fetchAndStoreNFLData } from '../backend/api.js';
import { connectToDatabase, client } from '../backend/utils/mongoClient.js';
import dotenv from 'dotenv';
dotenv.config();



// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function run() {
  try {
    const db = await connectToDatabase();
    console.log("Connected to MongoDB");
    await fetchAndStoreNFLData(db);
    console.log("NFL Data update complete");
  } catch (err) {
    console.error("Error during update:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
