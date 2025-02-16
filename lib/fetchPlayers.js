import mongoose from "mongoose";
import Player from "../models/Player.js"; // Player model
import connectDb from "../lib/db.js"; // Connect to DB

const FPL_API_URL = "https://fantasy.premierleague.com/api/bootstrap-static/";

export async function fetchAndStorePlayers() {
  await connectDb(); // Ensure DB is connected

  try {
    const response = await fetch(FPL_API_URL);
    const data = await response.json();
    const players = data.elements; // Players data

    console.log(`🔍 Fetching ${players.length} players from API...`);

    for (const player of players) {
      const update = {
        name: `${player.first_name} ${player.second_name}`,
        team: player.team,
        price: player.now_cost / 10, // Price in million
        position: player.element_type,
        points: player.total_points,
      };

      console.log(`ℹ️ Storing Player: ${update.name} (ID: ${player.id})`);

      const result = await Player.updateOne(
        { id: player.id }, // Find by ID
        { $set: update },
        { upsert: true } // Insert if not exists
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
