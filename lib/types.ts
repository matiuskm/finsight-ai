export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

export interface BudgetItem {
  category: string;
  allocated: number;
  spent: number;
}

export interface MonthlyDataPoint {
  month: string;
  income: number;
  expense: number;
}

export interface Summary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  savingsRate: number;
  monthlyData: MonthlyDataPoint[];
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: "tip" | "warning" | "achievement";
  icon: string;
}
