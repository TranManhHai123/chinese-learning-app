const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, lessonController.getAllLessons);
router.get('/:id', authenticateToken, lessonController.getLessonById);
router.post('/', authenticateToken, lessonController.createLesson);

module.exports = router;