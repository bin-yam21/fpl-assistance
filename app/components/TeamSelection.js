"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const API_URL = "/api/players"; // Adjust based on your backend route

const positions = [
  { id: "GK", label: "GK", x: 50, y: 75 },
  { id: "DEF1", label: "DEF", x: 20, y: 55 },
  { id: "DEF2", label: "DEF", x: 40, y: 55 },
  { id: "DEF3", label: "DEF", x: 60, y: 55 },
  { id: "DEF4", label: "DEF", x: 80, y: 55 },
  { id: "MID1", label: "MID", x: 20, y: 35 },
  { id: "MID2", label: "MID", x: 40, y: 35 },
  { id: "MID3", label: "MID", x: 60, y: 35 },
  { id: "MID4", label: "MID", x: 80, y: 35 },
  { id: "FWD1", label: "FWD", x: 35, y: 15 },
  { id: "FWD2", label: "FWD", x: 65, y: 15 },
  { id: "BENCH1", label: "BENCH", x: 20, y: 95 },
  { id: "BENCH2", label: "BENCH", x: 40, y: 95 },
  { id: "BENCH3", label: "BENCH", x: 60, y: 95 },
  { id: "BENCH4", label: "BENCH", x: 80, y: 95 },
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
    <div ref={drag} className="p-2 w-36 h-36 border bg-white cursor-pointer">
      <Image
        src={player.imageUrl}
        alt={player.name}
        width={70}
        height={70}
        className="w-full h-full object-cover"
      />
      <p className="text-center text-sm font-bold mt-2">{player.name}</p>
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
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 border-2 border-dashed p-2 rounded-lg w-24 h-24 flex items-center justify-center ${
        isOver ? "bg-green-200" : "bg-gray-200"
      }`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      {position.player ? (
        <Image
          src={position.player.imageUrl}
          alt={position.player.name}
          width={70}
          height={70}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-xs text-black">{position.label}</span>
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
      <div className="flex flex-col md:flex-row h-screen p-4 w-full">
        {/* Field Area (60%) */}
        <div className="relative w-full md:w-3/5 h-full bg-green-500 border border-black">
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
          className="w-full md:w-2/5 text-black p-4 bg-white border-l border-black overflow-y-auto"
          style={{ height: "calc(100vh - 2rem)" }}
        >
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 mb-4 border w-full"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
            {filteredPlayers.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
