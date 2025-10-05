const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5000;

/* ✅ Fix 1: Handle preflight OPTIONS requests early */
app.options('*', cors());

/* ✅ Fix 2: Use CORS for your frontend domain */
app.use(cors({
  origin: 'https://helpdsk.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

/* ✅ Fix 3: Manually ensure headers exist (for Vercel edge/serverless) */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://helpdsk.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

/* ✅ Body Parser */
app.use(express.json());

/* ✅ MongoDB connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch(err => console.error('❌ Database connection failed:', err.message));

/* ✅ Routes */
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

/* ✅ Health check */
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server running fine!' });
});

/* ✅ Start Server */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
