import budgetData from "@/lib/data/budget.json";
import type { BudgetItem } from "@/lib/types";

export async function getBudget(): Promise<BudgetItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return budgetData as BudgetItem[];
}
