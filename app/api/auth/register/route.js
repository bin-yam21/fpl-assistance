// pages/api/auth/register.js
import { hashPassword } from "../../lib/auth"; // Utility function to hash password
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ error: "User already exists" });
      }

      // Create a new user with hashed password
      const user = new User({
        email,
        password: await hashPassword(password),
      });
      await user.save();

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Registration failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
