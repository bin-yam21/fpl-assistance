import Image from "next/image";

const userTeam = [
  {
    id: 1,
    name: "Erling Haaland",
    position: "Forward",
    points: 150,
    fixture: "vs. Chelsea",
    image: "/haaland.png",
  },
  {
    id: 2,
    name: "Mohamed Salah",
    position: "Midfielder",
    points: 140,
    fixture: "vs. Arsenal",
    image: "/salah.png",
  },
  {
    id: 3,
    name: "Bukayo Saka",
    position: "Midfielder",
    points: 130,
    fixture: "vs. Liverpool",
    image: "/saka.png",
  },
];

export default function UserTeam() {
  return (
    <section className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your FPL Team</h2>
      <div className="grid grid-cols-3 gap-4">
        {userTeam.map((player) => (
          <div key={player.id} className="p-4 border rounded-lg text-center">
            <Image
              src={player.image}
              alt={player.name}
              width={80}
              height={80}
              className="mx-auto rounded-full"
            />
            <h3 className="mt-2 font-semibold">{player.name}</h3>
            <p className="text-gray-600">{player.position}</p>
            <p className="text-sm text-green-600">{player.fixture}</p>
            <p className="font-bold">{player.points} pts</p>
          </div>
        ))}
      </div>
    </section>
  );
}
