"use client"; // This ensures the component is client-side

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // For navigation in the app directory

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter(); // Use useRouter for client-side routing

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard", // Redirect on successful login
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    setIsSignUp(false); // Optionally, change the state after signup
  };

  const navigateToSignup = () => {
    router.push("/auth/signup"); // Navigate to the signup page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl text-black font-bold text-center mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <AnimatePresence mode="wait">
          <motion.form
            key={isSignUp ? "signup" : "signin"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </motion.form>
        </AnimatePresence>

        <div className="mt-4 text-center text-black">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Do not have an account?{" "}
              <button
                onClick={navigateToSignup} // Navigate to signup page
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
