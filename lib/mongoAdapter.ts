import { MongoClient } from 'mongodb';

type ExtendedGlobal = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!process.env.MONGODB_URI) {
  throw new Error('No Mongo DB configs is found');
}

const extendedGlobal: ExtendedGlobal = global;

const uri = process.env.MONGODB_URI;
const options = {};

let mongoClient: MongoClient;
let mongoClientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!extendedGlobal._mongoClientPromise) {
    mongoClient = new MongoClient(uri, options);
    extendedGlobal._mongoClientPromise = mongoClient.connect();
  }
  mongoClientPromise = extendedGlobal._mongoClientPromise;
} else {
  mongoClient = new MongoClient(uri, options);
  mongoClientPromise = mongoClient.connect();
}

export default mongoClientPromise;
