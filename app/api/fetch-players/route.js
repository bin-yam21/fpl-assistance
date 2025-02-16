import { NextResponse } from "next/server";
import { fetchAndStorePlayers } from "@/lib/fetchPlayers";

export async function GET() {
  try {
    await fetchAndStorePlayers();
    return NextResponse.json(
      { message: "Players fetched and stored successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
