import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Player from "@/models/Player";

export async function GET() {
  await connectDb();

  try {
    const players = await Player.find({});
    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
