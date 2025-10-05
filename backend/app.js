// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const path = require('path');
// // require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// // const authRoutes = require('./routes/auth');
// // const ticketRoutes = require('./routes/tickets');

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // /* ✅ Fix 1: Handle preflight OPTIONS requests early */
// // // app.options('*', cors());

// // /* ✅ Fix 2: Use CORS for your frontend domain */
// // app.use(cors({
// //   origin: 'https://helpdsk.netlify.app',
// //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// //   credentials: true
// // }));

// // /* ✅ Fix 3: Manually ensure headers exist (for Vercel edge/serverless) */
// // app.use((req, res, next) => {
// //   res.setHeader('Access-Control-Allow-Origin', 'https://helpdsk.netlify.app');
// //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
// //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// //   if (req.method === 'OPTIONS') {
// //     return res.sendStatus(200);
// //   }
// //   next();
// // });

// // /* ✅ Body Parser */
// // app.use(express.json());

// // /* ✅ MongoDB connection */
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('✅ Connected to MongoDB successfully'))
// //   .catch(err => console.error('❌ Database connection failed:', err.message));

// // /* ✅ Routes */
// // app.use('/api/auth', authRoutes);
// // app.use('/api/tickets', ticketRoutes);

// // /* ✅ Health check */
// // app.get('/api/health', (req, res) => {
// //   res.status(200).json({ message: 'Server running fine!' });
// // });

// // /* ✅ Start Server */
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });

// // app.js
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const ticketRoutes = require('./routes/tickets');

// const app = express();

// // ✅ Middlewares
// app.use(cors({
//   origin: 'https://helpdsk.netlify.app',
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization'],
//   credentials: true
// }));

// app.use(express.json());

// // ✅ Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tickets', ticketRoutes);

// // ✅ Health check
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'Server running fine!' });
// });

// module.exports = app; // Export app only

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const ticketRoutes = require('./routes/tickets');

// const app = express();

// // Middlewares
// app.use(cors({
//   origin: 'https://helpdskapp.netlify.app',
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization'],
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tickets', ticketRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'Server running fine!' });
// });

// // Export app only
// module.exports = app;

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const app = express();

// Allowed frontends
const allowedOrigins = [
  'https://helpdsk.netlify.app',
  'https://helpdskapp.netlify.app' // your current frontend
];

// Middlewares
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // Postman, mobile, etc.
    if(!allowedOrigins.includes(origin)) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Preflight requests handling
app.use((req, res, next) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server running fine!' });
});

// Export app only
module.exports = app;
