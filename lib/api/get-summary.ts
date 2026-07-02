import summaryData from "@/lib/data/summary.json";
import type { Summary } from "@/lib/types";

export async function getSummary(): Promise<Summary> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return summaryData as Summary;
}
