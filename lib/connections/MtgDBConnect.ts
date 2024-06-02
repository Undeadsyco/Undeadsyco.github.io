import mongoose from "mongoose";

declare global {
  var mtgDB: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGO_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable",
  );
}

let cached = global.mtgDB;

if (!cached) {
  cached = global.mtgDB = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'mtg',
    }).then((mongoose) => {
      console.log("database connection: ", mongoose)
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;