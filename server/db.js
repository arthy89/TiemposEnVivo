// import { MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
const database_url = process.env.MONGODB_URI;

// top level await
export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    // console.log(database_url);
    const conn = await mongoose.connect(database_url);

    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
