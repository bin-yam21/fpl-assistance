"use client"; // This must be a client component

import { useEffect, useState } from "react";

export default function LiveMatchUpdater() {
  const [isLive, setIsLive] = useState(false);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    async function updateLiveMatches() {
      const res = await fetch("/api/live-matches"); // Fetch from your Next.js API route
      const { live, upcoming } = await res.json();
      setIsLive(live);
      setIsUpcoming(upcoming);
    }

    updateLiveMatches(); // Initial fetch

    const interval = setInterval(updateLiveMatches, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  useEffect(() => {
    let interval;

    if (isLive) {
      console.log(
        "🔴 Live match detected. Running fetch-players every 5 minutes."
      );
      interval = setInterval(async () => {
        console.log("⏰ Fetching and updating player data...");
        await fetch("/api/fetch-players"); // Call your API to fetch and update players
      }, 300000); // Every 5 minutes
    } else if (isUpcoming) {
      console.log(
        "⚽ Upcoming match detected. Running fetch-players every 2 hours."
      );
      interval = setInterval(async () => {
        console.log("⏰ Fetching and updating player data...");
        await fetch("/api/fetch-players"); // Call your API to fetch and update players
      }, 7200000); // Every 2 hours
    } else {
      console.log(
        "No match detected today. Running fetch-players once every 24 hours."
      );
      interval = setInterval(async () => {
        console.log("⏰ Fetching and updating player data...");
        await fetch("/api/fetch-players"); // Call your API to fetch and update players
      }, 86400000); // Every 24 hours
    }

    return () => clearInterval(interval); // Cleanup interval
  }, [isLive, isUpcoming]);

  return (
    <div className="">
      {isLive ? (
        <p>🔴 Matches are live now!</p>
      ) : isUpcoming ? (
        <p>⚽ Upcoming matches are scheduled.</p>
      ) : (
        <p>🛑 No matches today.</p>
      )}
    </div>
  );
}
