const db = require('../config/database');

class Lesson {
  static async getAll(level = null) {
    let query = 'SELECT * FROM lessons';
    const params = [];

    if (level) {
      query += ' WHERE level = ?';
      params.push(level);
    }

    query += ' ORDER BY order_index';

    const [rows] = await db.query(query, params);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM lessons WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(title, description, level, orderIndex) {
    const [result] = await db.query(
      'INSERT INTO lessons (title, description, level, order_index) VALUES (?, ?, ?, ?)',
      [title, description, level, orderIndex]
    );
    return result.insertId;
  }
}

module.exports = Lesson;