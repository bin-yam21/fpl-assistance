import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold">FPL Assistant</h2>
      <nav className="mt-4">
        <ul className="space-y-3">
          <li>
            <Link
              href="/dashboard"
              className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/player-stats"
              className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              Player Stats
            </Link>
          </li>
          <li>
            <Link
              href="/team-builder"
              className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              Team Builder
            </Link>
          </li>
          <li>
            <Link
              href="/live-updates"
              className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              Live Updates
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
