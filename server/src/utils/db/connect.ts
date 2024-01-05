import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log(process.env.DB_USERNAME);
console.log(process.env.PORT);

let conn: MongoClient | null = null;
export let dbClient: Db | null = null;

const connectURI: string = process.env.DB_URI || "";
console.log(connectURI);
export const connectDB = async () => {
  try {
    if (!conn) {
      conn = await new MongoClient(connectURI).connect();
      dbClient = conn.db("Xction");
      console.log("MongoDB connected!!");
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const db = () => dbClient;

export default db;
