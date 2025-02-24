"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function PlayerField() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/api/players"); // Update with actual API route
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  // Organizing players by position
  const goalkeepers = players.filter((p) => p.position === 1);
  const defenders = players.filter((p) => p.position === 2);
  const midfielders = players.filter((p) => p.position === 3);
  const forwards = players.filter((p) => p.position === 4);

  return (
    <div className="relative flex flex-col items-center bg-green-700 h-screen w-full p-4">
      {/* Field Background */}
      <div className="absolute inset-0 bg-[url('/field.jpg')] bg-cover opacity-40" />

      {/* Players Display */}
      <div className="relative w-full max-w-4xl grid gap-4 grid-rows-4 py-10">
        {/* Forwards */}
        <div className="flex justify-center gap-4">
          {forwards.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* Midfielders */}
        <div className="flex justify-center gap-4">
          {midfielders.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* Defenders */}
        <div className="flex justify-center gap-4">
          {defenders.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* Goalkeepers */}
        <div className="flex justify-center gap-4">
          {goalkeepers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ player }) {
  return (
    <div className="flex flex-col items-center text-white">
      <Image
        src={player.imageUrl || "/default-player.png"}
        alt={player.name}
        width={50}
        height={50}
        className="rounded-full border-2 border-white"
      />
      <p className="text-sm mt-1">{player.name}</p>
    </div>
  );
}
