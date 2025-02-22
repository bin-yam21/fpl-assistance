import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Player from "@/models/Player";

// GET a single player by ID
export async function GET(request, { params }) {
  try {
    await connectDb();
    const { id } = params;

    const player = await Player.findById(id);
    if (!player) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(player, { status: 200 });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { error: "Failed to fetch player" },
      { status: 500 }
    );
  }
}
