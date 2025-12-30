const db = require('../config/database');

class Vocabulary {
  static async getByLessonId(lessonId) {
    const [rows] = await db.query(
      'SELECT * FROM vocabulary WHERE lesson_id = ?',
      [lessonId]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM vocabulary WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(lessonId, chineseChar, pinyin, english, audioUrl, exampleSentence) {
    const [result] = await db.query(
      'INSERT INTO vocabulary (lesson_id, chinese_char, pinyin, english, audio_url, example_sentence) VALUES (?, ?, ?, ?, ?, ?)',
      [lessonId, chineseChar, pinyin, english, audioUrl, exampleSentence]
    );
    return result.insertId;
  }

  static async search(searchTerm) {
    const [rows] = await db.query(
      'SELECT * FROM vocabulary WHERE chinese_char LIKE ? OR pinyin LIKE ? OR english LIKE ?',
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );
    return rows;
  }
}

module.exports = Vocabulary;