const express = require('express');
const cors = require('cors');
require('dotenv').config();

const lessonRoutes = require('./routes/lessonRoutes');
const vocabularyRoutes = require('./routes/vocabularyRoutes');
const progressRoutes = require('./routes/progressRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/lessons', lessonRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/progress', progressRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Chinese Learning API is running' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});