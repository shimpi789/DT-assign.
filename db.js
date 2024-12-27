// db.js
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';  // Replace with your MongoDB URI if needed
const dbName = 'nudgeDB';
let db;

export const connectToDB = async () => {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
};

export const getDB = () => db;
