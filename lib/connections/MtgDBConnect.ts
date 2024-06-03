import mongoose from "mongoose";

declare global {
  var mtgDB: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGO_URI;

let cached = global.mtgDB;

if (!cached) {
  cached = global.mtgDB = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable",
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'mtg',
    }).then((mongoose) => mongoose);
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