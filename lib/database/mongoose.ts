import mongoose, { Mongoose } from "mongoose";

const MongoDBUrl = process.env.MONGO_DB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MongoDBUrl) throw new Error("Missing MongoDB URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MongoDBUrl, {
      dbName: "AiSassPlatform",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
