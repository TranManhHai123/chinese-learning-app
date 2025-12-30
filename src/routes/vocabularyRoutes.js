const express = require('express');
const router = express.Router();
const vocabularyController = require('../controllers/vocabularyController');
const { authenticateToken } = require('../middleware/auth');

router.get('/lesson/:lessonId', authenticateToken, vocabularyController.getVocabularyByLesson);
router.get('/search', authenticateToken, vocabularyController.searchVocabulary);
router.post('/', authenticateToken, vocabularyController.createVocabulary);

module.exports = router;