const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(cors({
  origin: 'https://help-dsk.netlify.app', // Your frontend URL
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Body parser
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Database connection failed:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server running fine!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
