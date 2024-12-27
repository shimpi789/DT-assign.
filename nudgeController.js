import { MongoClient, ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const url = 'mongodb://localhost:27017';
const dbName = 'nudgeDB';
let db;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }
    db = client.db(dbName);
    console.log('Connected to MongoDB');
});

// Create a new nudge with image URL
export const createNudge = async (req, res) => {
    const db = getDB();
    const { title, scheduledDate, timing, description, sendTime, icon, image } = req.body;

    try {
        // Store the new nudge in MongoDB, including the image URL
        const newNudge = {
            title,
            image,  // Directly store the image URL
            scheduledDate,
            timing,
            description,
            sendTime: new Date(sendTime),
            icon,
        };

        const result = await db.collection('nudges').insertOne(newNudge);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create nudge', error });
    }
};

// Get all nudges
export const getNudges = async (req, res) => {
    const db = getDB();
    try {
        const nudges = await db.collection('nudges').find().toArray();
        res.status(200).json(nudges);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch nudges', error });
    }
};

// Update a nudge
export const updateNudge = async (req, res) => {
    const db = getDB();
    const { id } = req.params;
    const updatedNudge = req.body;

    try {
        const result = await db.collection('nudges').updateOne(
            { _id: ObjectId(id) },  // Convert string ID to ObjectId
            { $set: updatedNudge }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update nudge', error });
    }
};

// Delete a nudge
export const deleteNudge = async (req, res) => {
    const db = getDB();
    const { id } = req.params;

    try {
        const result = await db.collection('nudges').deleteOne({ _id: ObjectId(id) });  // Convert string ID to ObjectId
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete nudge', error });
    }
};
