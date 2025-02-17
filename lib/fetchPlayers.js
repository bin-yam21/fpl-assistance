// import mongoose from "mongoose";
import Player from "../models/Player.js"; // Player model
import connectDb from "./db.js";
import dotenv from "dotenv";
dotenv.config();
// Connect to DB

const FPL_API_URL = "https://fantasy.premierleague.com/api/bootstrap-static/";

export async function fetchAndStorePlayers() {
  console.log("📡 Connecting to MongoDB...");
  await connectDb();

  try {
    console.log("🌍 Fetching data from API...");
    const response = await fetch(FPL_API_URL);

    if (!response.ok) {
      throw new Error(
        `❌ API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (!data.elements) {
      throw new Error("❌ No player data received from API!");
    }

    console.log(`🔍 Received ${data.elements.length} players from API.`);

    for (const player of data.elements) {
      const update = {
        name: `${player.first_name} ${player.second_name}`,
        team: player.team,
        price: player.now_cost / 10, // Convert to million
        position: player.element_type,
        points: player.total_points,
        active: player.status === "a", // Active if status is "a"
      };

      console.log(`📝 Updating player: ${update.name} (ID: ${player.id})`);

      const result = await Player.updateOne(
        { id: player.id },
        { $set: update },
        { upsert: true }
      );

      console.log(
        `✅ Updated ${update.name} - Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`
      );
    }

    console.log("🎉 Players data updated successfully.");
  } catch (error) {
    console.error("❌ Error fetching players:", error);
  }
}

// Run function automatically when script is executed
fetchAndStorePlayers();
