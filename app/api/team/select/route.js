import connectDb from "../../../../lib/db";
import Team from "../../../../models/Team.js";
import { getServerSession } from "next-auth";

export const POST = async (req) => {
  try {
    const session = await getServerSession(req);
    if (!session)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const { players } = await req.json();

    // Validation: Ensure exactly 15 players are selected
    if (players.length !== 15) {
      return Response.json(
        { message: "You must select 15 players" },
        { status: 400 }
      );
    }

    // Attach image URLs to players
    const updatedPlayers = players.map((player) => ({
      ...player,
      imageUrl: `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`,
    }));

    await connectDb();
    await Team.findOneAndUpdate(
      { userId: session.user.id },
      { userId: session.user.id, players: updatedPlayers },
      { upsert: true }
    );

    return Response.json({ message: "Team saved successfully" });
  } catch (error) {
    return Response.json({ message: "Error saving team" }, { status: 500 });
  }
};
