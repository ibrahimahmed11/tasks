const mongoose = require("mongoose");

const dbConnect = async () => {
  if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
    throw new Error("Set MONGODB_URI and DB_NAME in your .env file before starting the server.");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected successfully");
  } catch (error) {
    throw new Error(`Database connection error: ${error.message}`);
  }
};

module.exports = dbConnect;
