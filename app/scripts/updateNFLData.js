// scripts/updateNFLData.js
import { MongoClient, ServerApiVersion } from ('mongodb');
import { fetchAndStoreNFLData } from ('../backend/api.js');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    await fetchAndStoreNFLData(client);
  } catch (err) {
    console.error("Error during update:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
