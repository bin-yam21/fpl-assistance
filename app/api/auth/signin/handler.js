// app/api/auth/signin/route.js
import User from "../../../models/User";
import dbConnect from "../../../../lib/db";
import { comparePassword } from "../../../../lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();

  // Check if user exists
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // Compare password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }

  // Successful login, send response
  return new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
  });
}
