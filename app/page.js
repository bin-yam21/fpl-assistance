"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
          <button className="mt-6 px-6 py-3 bg-green-500 text-lg font-semibold rounded-lg hover:bg-green-600 transition">
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
      <section className="px-8 py-16 bg-gray-100 text-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose FPL Assistant?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">
              🔥 AI-Powered Insights
            </h3>
            <p>
              Get player recommendations and transfer suggestions based on
              real-time data.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">📊 Advanced Stats</h3>
            <p>
              Analyze player performance with xG, xA, and other detailed
              metrics.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">⚽ Live Updates</h3>
            <p>
              Track live scores, injuries, and bonus points to stay ahead of the
              competition.
            </p>
          </div>
        </div>
      </section>

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
