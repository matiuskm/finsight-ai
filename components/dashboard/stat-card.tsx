"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { AnimatedCard } from "@/components/shared/animated-card";
import { cn } from "@/lib/utils";
import type { Summary } from "@/lib/types";

const iconMap = {
  balance: DollarSign,
  income: TrendingUp,
  expense: TrendingDown,
  savings: PiggyBank,
};

interface StatCardProps {
  type: "balance" | "income" | "expense" | "savings";
  value: number;
  label: string;
  subLabel?: string;
  delay?: number;
  isPercent?: boolean;
}

function CountUp({ value, isPercent }: { value: number; isPercent?: boolean }) {
  const motionValue = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: "easeOut",
      delay: 0.2,
      onUpdate(latest) {
        if (ref.current) {
          if (isPercent) {
            ref.current.textContent = latest.toFixed(1) + "%";
          } else {
            ref.current.textContent = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(latest);
          }
        }
      },
    });
    return controls.stop;
  }, [value, isPercent, motionValue]);

  return <span ref={ref}>$0.00</span>;
}

const colorMap = {
  balance: "from-blue-500/20 to-violet-500/20 border-blue-500/20",
  income: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
  expense: "from-rose-500/20 to-pink-500/20 border-rose-500/20",
  savings: "from-amber-500/20 to-orange-500/20 border-amber-500/20",
};

const iconColorMap = {
  balance: "text-blue-400 bg-blue-500/10",
  income: "text-emerald-400 bg-emerald-500/10",
  expense: "text-rose-400 bg-rose-500/10",
  savings: "text-amber-400 bg-amber-500/10",
};

export function StatCard({ type, value, label, subLabel, delay = 0, isPercent }: StatCardProps) {
  const Icon = iconMap[type];

  return (
    <AnimatedCard
      delay={delay}
      className={cn("p-6 bg-gradient-to-br border", colorMap[type])}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium text-white/50 uppercase tracking-widest">{label}</p>
        <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg", iconColorMap[type])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white tabular-nums">
        <CountUp value={value} isPercent={isPercent} />
      </p>
      {subLabel && (
        <p className="text-xs text-white/40 mt-2">{subLabel}</p>
      )}
    </AnimatedCard>
  );
}

export function StatCardsRow({ summary }: { summary: Summary }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard type="balance" value={summary.totalBalance} label="Total Balance" subLabel="All accounts" delay={0.05} />
      <StatCard type="income" value={summary.totalIncome} label="Income" subLabel="This month" delay={0.1} />
      <StatCard type="expense" value={summary.totalExpense} label="Expenses" subLabel="This month" delay={0.15} />
      <StatCard type="savings" value={summary.savingsRate} label="Savings Rate" subLabel="vs. 84.2% last month" delay={0.2} isPercent />
    </div>
  );
}
