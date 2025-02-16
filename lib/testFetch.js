const FPL_API_URL = "https://fantasy.premierleague.com/api/bootstrap-static/";

async function testFetch() {
  try {
    const response = await fetch(FPL_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ API Response:", data.elements.length, "players found.");
  } catch (error) {
    console.error("❌ Fetching error:", error);
  }
}

// Run the function
testFetch();
