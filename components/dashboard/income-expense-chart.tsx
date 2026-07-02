"use client";

import { useState } from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { AnimatedCard } from "@/components/shared/animated-card";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { MonthlyDataPoint } from "@/lib/types";

interface TooltipEntry {
  name?: string;
  value?: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/90 backdrop-blur-md px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-white/60 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{formatCurrency(entry.value ?? 0)}</span>
        </div>
      ))}
    </div>
  );
}

type ChartType = "area" | "bar";

export function IncomeExpenseChart({ data, delay = 0 }: { data: MonthlyDataPoint[]; delay?: number }) {
  const [chartType, setChartType] = useState<ChartType>("area");

  const axisProps = {
    cartesianGrid: <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />,
    xAxis: <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />,
    yAxis: <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />,
    tooltip: <Tooltip content={<CustomTooltip />} />,
  };

  return (
    <AnimatedCard delay={delay} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-white">Income vs. Expenses</h2>
          <p className="text-xs text-white/40 mt-0.5">6-month overview</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Chart type toggle */}
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs">
            {(["area", "bar"] as ChartType[]).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={cn(
                  "px-3 py-1 rounded-md capitalize transition-all duration-200",
                  chartType === type
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-500" />Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-rose-500" />Expenses
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {chartType === "area" ? (
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            {axisProps.cartesianGrid}
            {axisProps.xAxis}
            {axisProps.yAxis}
            {axisProps.tooltip}
            <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} fill="url(#gradIncome)" dot={false} activeDot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }} />
            <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fill="url(#gradExpense)" dot={false} activeDot={{ r: 4, fill: "#f43f5e", strokeWidth: 0 }} />
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
            {axisProps.cartesianGrid}
            {axisProps.xAxis}
            {axisProps.yAxis}
            {axisProps.tooltip}
            <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
            <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </AnimatedCard>
  );
}
