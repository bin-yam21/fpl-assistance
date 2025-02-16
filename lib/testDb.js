import mongoose from "mongoose";
import connectDb from "./db.js"; // Your DB connection file

async function testDbConnection() {
  try {
    await connectDb();
    console.log("✅ MongoDB Connected Successfully");
    mongoose.connection.close(); // Close after test
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

// Run test
testDbConnection();
