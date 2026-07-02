"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCardsRow } from "@/components/dashboard/stat-card";
import { IncomeExpenseChart } from "@/components/dashboard/income-expense-chart";
import { BudgetTracker } from "@/components/dashboard/budget-tracker";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { AiRecommendationPanel } from "@/components/dashboard/ai-recommendation-panel";
import {
  StatCardSkeleton,
  ChartSkeleton,
  ListSkeleton,
  BudgetSkeleton,
  InsightSkeleton,
} from "@/components/shared/loading-skeleton";
import { getSummary } from "@/lib/api/get-summary";
import { getBudget } from "@/lib/api/get-budget";
import { getTransactions } from "@/lib/api/get-transactions";
import { getAiInsights } from "@/lib/api/get-ai-insights";
import type { Summary, BudgetItem, Transaction, Insight } from "@/lib/types";

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [budget, setBudget] = useState<BudgetItem[] | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [insights, setInsights] = useState<Insight[] | null>(null);

  useEffect(() => {
    getSummary().then(setSummary);
    getBudget().then(setBudget);
    getTransactions().then(setTransactions);
    getAiInsights().then(setInsights);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-teal-600/8 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />

        {/* Stat cards */}
        {summary ? (
          <StatCardsRow summary={summary} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Chart + Budget row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2">
            {summary ? (
              <IncomeExpenseChart data={summary.monthlyData} delay={0.25} />
            ) : (
              <ChartSkeleton />
            )}
          </div>
          <div>
            {budget ? (
              <BudgetTracker items={budget} delay={0.3} />
            ) : (
              <BudgetSkeleton />
            )}
          </div>
        </div>

        {/* Transactions + AI Insights row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2">
            {transactions ? (
              <RecentTransactions transactions={transactions} delay={0.35} />
            ) : (
              <ListSkeleton rows={8} />
            )}
          </div>
          <div>
            {insights ? (
              <AiRecommendationPanel insights={insights} delay={0.4} />
            ) : (
              <InsightSkeleton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
