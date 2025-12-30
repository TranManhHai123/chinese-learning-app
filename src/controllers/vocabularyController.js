const Vocabulary = require('../models/Vocabulary');

exports.getVocabularyByLesson = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.getByLessonId(req.params.lessonId);
    res.json({ vocabulary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchVocabulary = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search term required' });
    }
    const results = await Vocabulary.search(q);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVocabulary = async (req, res) => {
  try {
    const { lessonId, chineseChar, pinyin, english, audioUrl, exampleSentence } = req.body;
    const vocabId = await Vocabulary.create(
      lessonId,
      chineseChar,
      pinyin,
      english,
      audioUrl,
      exampleSentence
    );
    res.status(201).json({ message: 'Vocabulary created', vocabId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};