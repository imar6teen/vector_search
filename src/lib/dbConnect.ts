import mongoose from "mongoose";

function mongoOptions(): mongoose.ConnectOptions {
  if (process.env.NODE_ENV === "development")
    return {
      bufferCommands: false,
      tls: true,
      tlsAllowInvalidCertificates: true,
      dbName: process.env.MONGO_DBNAME,
      authMechanism: "MONGODB-X509",
      authSource: "$external",
      connectTimeoutMS: 10000,
      tlsCertificateKeyFile: process.env.MONGO_CERT,
    };

  return {
    user: process.env.MONGO_PROD_NAME,
    pass: process.env.MONGO_PROD_PASS,
    dbName: process.env.MONGO_DBNAME,
  };
}

declare global {
  var mongoose: any;
}

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL)
  throw new Error("Please defined the MONGO_URL environment variable");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = mongoOptions();

    cached.promise = mongoose
      .connect(MONGO_URL as string, opts)
      .then((mongoose) => {
        console.log("Database Connected");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error(err);
    throw err;
  }

  return cached.conn;
}

export default dbConnect;
