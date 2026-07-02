import transactionsData from "@/lib/data/transactions.json";
import type { Transaction } from "@/lib/types";

export async function getTransactions(): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return transactionsData as Transaction[];
}
