import Sidebar from "../components/Sidebar";
import UserTeam from "../components/UserTeam";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-700">
          Manage your FPL team with real-time insights.
        </p>
        <div className="mt-6">
          <UserTeam />
        </div>
      </main>
    </div>
  );
}
