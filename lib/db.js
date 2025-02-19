import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing in .env file");
    process.exit(1); // Exit if no DB URI is set
  }

  if (!process.env.DB_PASSWORD) {
    console.error("❌ DB_PASSWORD is missing in .env file");
    process.exit(1); // Exit if no DB password is set
  }

  console.log("⏳ Connecting to MongoDB...");

  try {
    const uri = process.env.MONGODB_URI.replace(
      "<PASSWORD>",
      process.env.DB_PASSWORD
    );
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // Set timeout to 30 seconds
      socketTimeoutMS: 45000, // Set socket timeout to 45 seconds
    });
    console.log("✅ Connected to MongoDB:", uri);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Call the function to connect to the database
// connectDb();

// Export the function for use in other modules
export default connectDb;
