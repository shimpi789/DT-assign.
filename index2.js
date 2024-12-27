import express from 'express';
import cors from 'cors';
import nudgeRoutes from './routes/nudgeRoutes.js';
import { connectToDB } from './db.js';  // Import your DB connection function

const app = express();

// Enable CORS for all origins (or configure specific origins)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Use the nudge routes
app.use('/nudges', nudgeRoutes);

// Start the server after connecting to MongoDB
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Start the server after the DB connection is established
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

// Call the startServer function to initiate the server
startServer();
