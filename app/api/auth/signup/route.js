import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";

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

    const db = (await clientPromise).db();

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Create new user object
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Insert the user into the database
    await db.collection("users").insertOne(newUser);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
