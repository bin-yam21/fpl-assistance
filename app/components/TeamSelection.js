"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const API_URL = "/api/players"; // Adjust based on your backend route

const positions = [
  { id: "GK", label: "GK", x: 50, y: 90 },
  { id: "DEF1", label: "DEF", x: 20, y: 70 },
  { id: "DEF2", label: "DEF", x: 40, y: 70 },
  { id: "DEF3", label: "DEF", x: 60, y: 70 },
  { id: "DEF4", label: "DEF", x: 80, y: 70 },
  { id: "MID1", label: "MID", x: 20, y: 50 },
  { id: "MID2", label: "MID", x: 40, y: 50 },
  { id: "MID3", label: "MID", x: 60, y: 50 },
  { id: "MID4", label: "MID", x: 80, y: 50 },
  { id: "FWD1", label: "FWD", x: 35, y: 30 },
  { id: "FWD2", label: "FWD", x: 65, y: 30 },
];

const Player = ({ player }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLAYER",
    item: { player },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="p-2 w-96 h-48 border bg-white cursor-pointer">
      <Image
        src={player.imageUrl}
        alt={player.name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <p>{player.name}</p>
    </div>
  );
};

const PositionSlot = ({ position, onDropPlayer }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PLAYER",
    drop: (item) => onDropPlayer(position.id, item.player),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 border-2 border-dashed p-2 rounded-lg w-14 h-14 flex items-center justify-center ${
        isOver ? "bg-green-200" : "bg-gray-200"
      }`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      {position.player ? (
        <Image
          src={position.player.imageUrl}
          alt={position.player.name}
          width={56}
          height={56}
          className="w-full h-full rounded-full"
        />
      ) : (
        <span>{position.label}</span>
      )}
    </div>
  );
};

export default function TeamSelection() {
  const [team, setTeam] = useState(positions);
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
    fetchPlayers();
  }, []);

  const onDropPlayer = (positionId, player) => {
    setTeam((prevTeam) =>
      prevTeam.map((pos) => (pos.id === positionId ? { ...pos, player } : pos))
    );
  };

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen p-4">
        {/* Field Area (60%) */}
        <div className="relative w-3/5 h-full bg-green-500 border border-black">
          {team.map((pos) => (
            <PositionSlot
              key={pos.id}
              position={pos}
              onDropPlayer={onDropPlayer}
            />
          ))}
        </div>

        {/* Player List (40%) */}
        <div
          className="w-2/5 text-black p-4 bg-white border-l border-black overflow-y-auto"
          style={{ height: "calc(100vh - 2rem)" }}
        >
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 mb-4 border w-full"
          />
          <div className="grid grid-cols-2 gap-4 min-h-[200px]">
            {filteredPlayers.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
