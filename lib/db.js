import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing in .env file");
    process.exit(1); // Exit if no DB URI is set
  }

  // Log the URI to make sure it's correct
  console.log("MongoDB URI: ", process.env.MONGODB_URI);

  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Optional: Set timeout to 30 seconds
      socketTimeoutMS: 45000, // Optional: Set socket timeout to 45 seconds
    });
    console.log("✅ Connected to MongoDB:", process.env.MONGODB_URI);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDb;
