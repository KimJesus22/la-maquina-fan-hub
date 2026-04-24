import { getMatches } from "@/app/actions/data";
import MatchTimeline from "@/components/MatchTimeline";

export default async function MatchesSection() {
  const matches = await getMatches();

  return <MatchTimeline matches={matches} />;
}
