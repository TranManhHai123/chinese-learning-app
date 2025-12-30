const Lesson = require('../models/Lesson');

exports.getAllLessons = async (req, res) => {
  try {
    const { level } = req.query;
    const lessons = await Lesson.getAll(level);
    res.json({ lessons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.getById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json({ lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { title, description, level, orderIndex } = req.body;
    const lessonId = await Lesson.create(title, description, level, orderIndex);
    res.status(201).json({ message: 'Lesson created', lessonId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};