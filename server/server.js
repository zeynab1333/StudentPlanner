console.log('SERVER.JS IS RUNNING');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const timetableRoutes = require('./routes/timetable');
const assignmentsRoutes = require('./routes/assignments');
const alertsRoutes = require('./routes/alerts');
const helpRoutes = require('./routes/help');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/help', helpRoutes);

// Test route to verify backend is reachable
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
