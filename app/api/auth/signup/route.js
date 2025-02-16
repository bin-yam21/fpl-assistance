// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDb from "../../../../lib/db"; // Importing mongoose DB connection
// Importing the User model
import User from "../../../../models/User";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Connect to the database using Mongoose
    await connectDb();

    // Check if the user already exists using the User model
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Create new user with hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Here you could add additional signup logic, such as sending an email, confirming registration, etc.
    // For example, you might want to set a `isConfirmed` flag to false until the user verifies their email.

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json(
      {
        message: "Signup successful! Please check your email for confirmation.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json(
      { error: "Error signing up user" },
      { status: 500 }
    );
  }
}
