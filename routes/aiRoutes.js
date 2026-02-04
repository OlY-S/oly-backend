const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/chat', aiController.chatWithBot);
router.post('/roadmap', aiController.generateRoadmap);

module.exports = router;
