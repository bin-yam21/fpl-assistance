import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Change this to a secure env variable

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" } // Set token expiration
    );

    // Store token in HTTP-only cookie
    const response = NextResponse.json(
      { message: "Login successful", user: { email: user.email } },
      { status: 200 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
