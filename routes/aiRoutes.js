import express from 'express';
import { chatWithBot, generateRoadmap } from '../controllers/aiController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply middleware to protect these routes
router.post('/chat', verifyToken, chatWithBot);
router.post('/roadmap', verifyToken, generateRoadmap);

export default router;
