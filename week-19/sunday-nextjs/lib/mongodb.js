import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const cashed = global.mongoose;

if (!cashed) {
  cashed = global.mongoose = { conn: null, promise: null };
}

async function connectTodatabase() {
  if (cashed.conn) {
    return cashed.conn;
  }

  if (!cashed.promise) {
    const opts = {
      bufferCommands: false,
    };
    cashed.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cashed.conn = await cashed.promise;
  } catch (e) {
    cashed.promise = null;
    throw e;
  }

  return cashed.conn;
}

export default connectTodatabase;
