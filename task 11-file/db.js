const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI in the environment.
 * Exits the process if the connection fails, since the API
 * is unusable without a database.
 */
async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not set in the environment (.env file).');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected.');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
