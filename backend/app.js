const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Proper CORS setup (for Netlify frontend)
app.use(cors({
  origin: 'https://helpdsk.netlify.app', // your frontend domain
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Extra protection: Add headers manually (fixes Vercel issues)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://helpdsk.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Body parser
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch(err => console.error('❌ Database connection failed:', err.message));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server running fine!' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
