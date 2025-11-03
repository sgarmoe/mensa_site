// scripts/testMongoConnection.js
import { connectToDatabase } from './mongoClient.js';

async function testConnection() {
  try {
    const db = await connectToDatabase(); // defaults to 'admin' or pass your DB name

    // Try listing collections or pinging
    const collections = await db.listCollections().toArray();
    console.log("✅ Connected! Collections in the DB:");
    console.table(collections.map(c => c.name));
  } catch (error) {
    console.error("❌ MongoDB connection test failed:", error.message);
  } finally {
    process.exit(); // clean exit
  }
}

testConnection();
