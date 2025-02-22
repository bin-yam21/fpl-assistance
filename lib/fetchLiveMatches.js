// import fetchAndUpdatePlayers from "./fetchPlayers";

const MATCHES_API = "https://fantasy.premierleague.com/api/fixtures/";

export default async function fetchLiveMatches() {
  try {
    console.log("🔎 Checking for today's matches...");

    // Use the built-in fetch (no need for node-fetch)
    const response = await fetch(MATCHES_API, {
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) throw new Error("Failed to fetch match data");

    const fixtures = await response.json();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Filter matches that are scheduled for today
    const todayMatches = fixtures.filter(
      (match) => match.kickoff_time && match.kickoff_time.startsWith(today)
    );

    // Check if any of today's matches are live
    const liveMatches = todayMatches.filter(
      (match) => match.started && !match.finished_provisional
    );

    console.log(`📅 Found ${todayMatches.length} matches for today.`);
    console.log(`⚽ ${liveMatches.length} matches are currently live.`);

    return liveMatches.length > 0;
  } catch (error) {
    console.error("❌ Error checking live matches:", error);
    return false;
  }
}
