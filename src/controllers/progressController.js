const Progress = require('../models/Progress');

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.getUserProgress(req.user.userId);
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { lessonId, vocabularyId, status, score } = req.body;
    const progressId = await Progress.updateProgress(
      req.user.userId,
      lessonId,
      vocabularyId,
      status,
      score
    );
    res.json({ message: 'Progress updated', progressId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLessonProgress = async (req, res) => {
  try {
    const progress = await Progress.getLessonProgress(
      req.user.userId,
      req.params.lessonId
    );
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};