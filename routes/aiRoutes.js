import express from 'express';
import { chatWithBot, generateRoadmap } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', chatWithBot);
router.post('/roadmap', generateRoadmap);

export default router;
