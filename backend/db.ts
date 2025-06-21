import { MongoClient } from "mongodb";
import config from "./config.js";

const uri = `mongodb://localhost:${config.port_mongo}`;

function handleClient() {
  try {
    let client = new MongoClient(uri);
    return client;
  }
  catch {
    console.log('< Not mongodb connection found');
    process.exit(1);
  }
}

const client = handleClient();
let db: ReturnType<MongoClient["db"]>;

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