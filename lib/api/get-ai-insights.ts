import insightsData from "@/lib/data/insights.json";
import type { Insight } from "@/lib/types";

export async function getAiInsights(): Promise<Insight[]> {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  return insightsData as Insight[];
}
