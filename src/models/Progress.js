const db = require('../config/database');

class Progress {
  static async getUserProgress(userId) {
    const [rows] = await db.query(
      `
      SELECT up.*, l.title as lesson_title, v.chinese_char, v.pinyin
      FROM user_progress up
      LEFT JOIN lessons l ON up.lesson_id = l.id
      LEFT JOIN vocabulary v ON up.vocabulary_id = v.id
      WHERE up.user_id = ?
      ORDER BY up.completed_at DESC
      `,
      [userId]
    );
    return rows;
  }

  static async updateProgress(userId, lessonId, vocabularyId, status, score) {
    const [existing] = await db.query(
      'SELECT id FROM user_progress WHERE user_id = ? AND lesson_id = ? AND vocabulary_id = ?',
      [userId, lessonId, vocabularyId]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE user_progress SET status = ?, score = ?, completed_at = NOW() WHERE id = ?',
        [status, score, existing[0].id]
      );
      return existing[0].id;
    } else {
      const [result] = await db.query(
        'INSERT INTO user_progress (user_id, lesson_id, vocabulary_id, status, score, completed_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [userId, lessonId, vocabularyId, status, score]
      );
      return result.insertId;
    }
  }

  static async getLessonProgress(userId, lessonId) {
    const [rows] = await db.query(
      'SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?',
      [userId, lessonId]
    );
    return rows;
  }
}

module.exports = Progress;