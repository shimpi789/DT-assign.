import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

// MongoDB Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'eventDB';

let db;

// Connect to MongoDB
const connectDB = async () => {
    try {
        const client = new MongoClient(url); // No need for useNewUrlParser or useUnifiedTopology
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};


connectDB();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// POST: Create a new event
app.post('/api/v3/app/events', async (req, res) => {
    const { name, tagline, schedule, description, files, moderator, category, sub_category, rigor_rank, attendees } = req.body;

    // Check if all required fields are provided
    if (!name || !tagline || !schedule || !description || !moderator || !category || !sub_category || !rigor_rank || !attendees) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEvent = {
        uid: 18, // Example user ID
        name,
        tagline,
        schedule,
        description,
        files,
        moderator,
        category,
        sub_category,
        rigor_rank,
        attendees
    };

    try {
        const result = await db.collection('events').insertOne(newEvent);
        return res.status(201).json({ id: result.insertedId, ...newEvent });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create event', error });
    }
});

// GET: Fetch a specific event by ID
app.get('/api/v3/app/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
        if (event) {
            return res.status(200).json(event);
        } else {
            return res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch event', error });
    }
});

// GET: Fetch latest events with pagination
app.get('/api/v3/app/events', async (req, res) => {
    const { type, limit, page } = req.query;

    if (type === 'latest') {
        const limitNumber = parseInt(limit, 10) || 10; // Default limit to 10 if not provided
        const pageNumber = parseInt(page, 10) || 1;    // Default to page 1 if not provided

        try {
            const events = await db.collection('events')
                .find()
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber)
                .toArray();

            return res.status(200).json(events);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch events', error });
        }
    }

    return res.status(400).json({ message: 'Invalid query parameters' });
});

// PUT: Update an event by ID
app.put('/api/v3/app/events/:id', async (req, res) => {
    const { id } = req.params;
    const { name, tagline, schedule, description, files, moderator, category, sub_category, rigor_rank, attendees } = req.body;

    const updatedEvent = {
        name,
        tagline,
        schedule,
        description,
        files,
        moderator,
        category,
        sub_category,
        rigor_rank,
        attendees
    };

    try {
        const result = await db.collection('events').updateOne({ _id: new ObjectId(id) }, { $set: updatedEvent });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json(updatedEvent);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update event', error });
    }
});

// DELETE: Delete an event by ID
app.delete('/api/v3/app/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete event', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
