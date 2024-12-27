import express from 'express';
import { createNudge, getNudges, updateNudge, deleteNudge } from '../controllers/nudgeController.js';

const router = express.Router();

// Create a new nudge (No file upload needed now)
router.post('/nudges', createNudge);

// Get all nudges
router.get('/nudges', getNudges);

// Update a nudge
router.put('/nudges/:id', updateNudge);

// Delete a nudge
router.delete('/nudges/:id', deleteNudge);

export default router;
