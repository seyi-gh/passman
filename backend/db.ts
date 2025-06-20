import { MongoClient } from "mongodb";
import config from "./config.js";

const uri = `mongodb://localhost:${config.port_mongo}`;
const client = new MongoClient(uri);

let db: ReturnType<typeof client.db>;

export default async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db(config.db_name);
    }
    catch {
      console.log('< Error connection to database');
    }
  }
  return db;
}