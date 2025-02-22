import mongoose from "mongoose";
import Player from "../models/Player.js";
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
        price: player.now_cost / 10,
        position: player.element_type,
        points: player.total_points,
        active: player.status === "a",
      };

      console.log(`📝 Checking player: ${update.name} (ID: ${player.id})`);

      const existingPlayer = await Player.findOne({ id: player.id });

      if (existingPlayer) {
        // Check if only the points have changed
        if (existingPlayer.points !== update.points) {
          console.log(`🔄 Updating points for player: ${update.name}`);
          try {
            const result = await Player.updateOne(
              { id: player.id },
              { $set: { points: update.points } }
            );
            if (result.modifiedCount > 0) {
              console.log(`✅ Updated points for ${update.name}`);
            } else {
              console.log(`🔁 No change in points for ${update.name}`);
            }
          } catch (error) {
            console.error(
              `❌ Error updating points for ${update.name}:`,
              error
            );
          }
        } else {
          console.log(`⚡ No change in points for player: ${update.name}`);
        }
      } else {
        console.log(`📥 Inserting new player: ${update.name}`);
        await Player.create({ id: player.id, ...update });
      }
    }

    console.log("🎉 Players data updated successfully.");
  } catch (error) {
    console.error("❌ Error fetching players:", error);
  }
}

// ✅ Export function properly
export default fetchAndStorePlayers;
