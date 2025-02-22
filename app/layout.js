import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./Provider";
// import scheduleFetch from "@/lib/scheduler";
import LiveMatchUpdater from "./components/LiveMatchUpdater";
// import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fpl assistance",
  description:
    "an app designed for helping fpl managers for fantasy premier league games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="pt-20 md:pt-16">
            {" "}
            {/* Adjust padding to avoid overlap */}
            <LiveMatchUpdater />{" "}
            {/* Runs live match updates in the background */}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
