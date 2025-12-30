const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, progressController.getUserProgress);
router.post('/', authenticateToken, progressController.updateProgress);
router.get('/lesson/:lessonId', authenticateToken, progressController.getLessonProgress);

module.exports = router;