"use client";

import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/shared/animated-card";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BudgetItem } from "@/lib/types";

const categoryIcons: Record<string, string> = {
  Food: "🍜",
  Transport: "🚗",
  Entertainment: "🎬",
  Health: "💊",
  Utilities: "⚡",
  Shopping: "🛍️",
};

function getBarColor(pct: number) {
  if (pct >= 85) return "from-rose-500 to-pink-500";
  if (pct >= 60) return "from-amber-500 to-yellow-400";
  return "from-emerald-500 to-teal-400";
}

function getTextColor(pct: number) {
  if (pct >= 85) return "text-rose-400";
  if (pct >= 60) return "text-amber-400";
  return "text-emerald-400";
}

export function BudgetTracker({ items, delay = 0 }: { items: BudgetItem[]; delay?: number }) {
  return (
    <AnimatedCard delay={delay} className="p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">Budget Tracker</h2>
        <p className="text-xs text-white/40 mt-0.5">Monthly limits by category</p>
      </div>
      <div className="space-y-5">
        {items.map((item, i) => {
          const pct = Math.min((item.spent / item.allocated) * 100, 100);
          return (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{categoryIcons[item.category] ?? "📦"}</span>
                  <span className="text-sm text-white/80">{item.category}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className={cn("font-medium", getTextColor(pct))}>
                    {formatCurrency(item.spent)}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="text-white/40">{formatCurrency(item.allocated)}</span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full bg-gradient-to-r", getBarColor(pct))}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: delay + i * 0.08, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AnimatedCard>
  );
}
