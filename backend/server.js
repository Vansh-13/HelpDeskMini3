// const mongoose = require('mongoose');
// const app = require('./app.js')
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Explicit path to .env

// const PORT = process.env.PORT || 5000;

// // ✅ MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ Connected to MongoDB successfully');

//     // ✅ Start server only after DB connection
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch(err => console.error('❌ Database connection failed:', err.message));
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = require('./app'); // app.js se Express app import

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');

    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Database connection failed:', err.message));
