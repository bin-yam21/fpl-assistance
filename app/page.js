"use client";
import LatestNews from "./components/LatestNews";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession(); // Get user session
  const router = useRouter(); // Router for navigation

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    } else {
      router.push("/auth/signin"); // Redirect to sign-in page if not logged in
    }
  };
  const cardVariants = {
    offscreen: {
      x: -100, // Start offscreen to the left
      opacity: 0,
    },
    onscreen: {
      x: 0, // Move to the center
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-800 to-purple-600 text-white px-6 lg:px-16">
        {/* Left Side - Text Content */}
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Dominate Fantasy Premier League
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            Get AI-powered insights, live updates, and expert recommendations to
            optimize your FPL team.
          </p>
          {/* Conditional Redirect Button */}
          <button
            onClick={handleGetStarted}
            className="mt-6 px-6 py-3 bg-green-500 text-lg font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right Side - Hero Image */}
        <div className="mt-8 lg:mt-0 lg:ml-12 flex justify-center">
          <Image
            src="/hero-2.webp"
            alt="FPL Players"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full max-w-md lg:max-w-lg xl:max-w-2xl"
            priority
          />
        </div>
      </section>
      {/* Highlight Section */}
      <section className="px-8 py-24 bg-gray-100 text-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose FPL Assistant?</h2>
        <div className="flex overflow-x-auto gap-8 pb-8">
          {/* Card 1 */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md min-w-[300px] flex-shrink-0"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              🔥 AI-Powered Insights
            </h3>
            <p className="text-lg">
              Get player recommendations and transfer suggestions based on
              real-time data.
            </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md min-w-[300px] flex-shrink-0"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">📊 Advanced Stats</h3>
            <p className="text-lg">
              Analyze player performance with xG, xA, and other detailed
              metrics.
            </p>
          </motion.div>
          {/* Card 3 */}

          <motion.div
            className="bg-white p-8 rounded-lg shadow-md min-w-[300px] flex-shrink-0"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">⚽ Live Updates</h3>
            <p className="text-lg">
              Track live scores, injuries, and bonus points to stay ahead of the
              competition.
            </p>
          </motion.div>
        </div>
      </section>
      <LatestNews />

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-6 mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} FPL Assistant. All Rights Reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
