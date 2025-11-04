import { fetchAndStoreNFLData } from './fetchAndStoreNFLData.js';
import { connectToDatabase, client } from '../config/mongoClient.js';
import dotenv from 'dotenv';
dotenv.config();

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
