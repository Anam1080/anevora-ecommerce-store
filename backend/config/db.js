const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is missing from .env");
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ MongoDB connected successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ MongoDB connection failed.");
    console.error("Error:", error.message);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  }
}

module.exports = connectDB;