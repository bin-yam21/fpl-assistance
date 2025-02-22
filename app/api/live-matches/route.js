import fetchLiveMatches from "@/lib/fetchLiveMatches";

export async function GET() {
  const live = await fetchLiveMatches();
  return Response.json({ live });
}
