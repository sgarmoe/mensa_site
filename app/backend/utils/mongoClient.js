import { MongoClient, ServerApiVersion } from 'mongodb';
import '../loadEnv.js';

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("Cannot access Mongo DB URI");
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let cachedDb = null;

export async function connectToDatabase(dbName = 'nfl_data') {
    if (cachedDb) return cachedDb;

    try {
        await client.connect();
        cachedDb = client.db(dbName);
        console.log(`connected to Mongo: ${dbName}`);
        return cachedDb;
    } catch (err) {
        console.log("Cannot connect to MongoDB", err);
        throw err;
    }
}
