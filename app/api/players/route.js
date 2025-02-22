import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Player from "@/models/Player";

// GET all players with filters
export async function GET(request) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);

    let query = {};
    const name = searchParams.get("name");
    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Filter by active status
    const isActive = searchParams.get("active");
    if (isActive !== null) {
      query.active = isActive === "true";
    }

    // Filter by price range
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      query.price = {};
      if (!isNaN(parseFloat(minPrice))) query.price.$gte = parseFloat(minPrice);
      if (!isNaN(parseFloat(maxPrice))) query.price.$lte = parseFloat(maxPrice);
    }

    // Filter by position
    const position = searchParams.get("position");
    if (position && !isNaN(parseInt(position)))
      query.position = parseInt(position);

    // Filter by team
    const team = searchParams.get("team");
    if (team && !isNaN(parseInt(team))) query.team = parseInt(team);

    const players = await Player.find(query).sort({ price: 1 });

    if (!players.length) {
      return NextResponse.json(
        { message: "No players found matching criteria." },
        { status: 404 }
      );
    }

    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
