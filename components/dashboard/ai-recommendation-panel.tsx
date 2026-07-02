"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, TrendingUp, Lightbulb, Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAiInsights } from "@/lib/api/get-ai-insights";
import type { Insight } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Zap,
};

const typeStyles: Record<Insight["type"], string> = {
  warning: "border-amber-500/20 bg-amber-500/5",
  achievement: "border-emerald-500/20 bg-emerald-500/5",
  tip: "border-blue-500/20 bg-blue-500/5",
};

const typeIconColors: Record<Insight["type"], string> = {
  warning: "text-amber-400",
  achievement: "text-emerald-400",
  tip: "text-blue-400",
};

interface AiRecommendationPanelProps {
  insights: Insight[];
  delay?: number;
}

export function AiRecommendationPanel({ insights: initialInsights, delay = 0 }: AiRecommendationPanelProps) {
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  async function handleRegenerate() {
    setLoading(true);
    const fresh = await getAiInsights();
    // shuffle so it feels like a new generation
    const shuffled = [...fresh].sort(() => Math.random() - 0.5);
    setInsights(shuffled);
    setKey((k) => k + 1);
    setLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 to-blue-950/40 backdrop-blur-md shadow-lg shadow-violet-900/20 p-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 shadow-md shadow-violet-500/30">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">AI Insights</h2>
          <p className="text-xs text-violet-300/50">Powered by FinSight AI</p>
        </div>
        <button
          onClick={handleRegenerate}
          disabled={loading}
          className="ml-auto flex items-center gap-1.5 text-xs text-violet-300/70 hover:text-violet-200 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 rounded-full px-2.5 py-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
          {loading ? "Analyzing…" : "Regenerate"}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-violet-500/10 bg-violet-500/5 p-4 space-y-2 animate-pulse">
                  <div className="h-3 w-1/2 rounded bg-violet-500/20" />
                  <div className="h-3 w-full rounded bg-violet-500/10" />
                  <div className="h-3 w-3/4 rounded bg-violet-500/10" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key={key} className="space-y-3">
              {insights.map((insight, i) => {
                const Icon = iconMap[insight.icon] ?? Sparkles;
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className={cn(
                      "rounded-xl border p-4 transition-colors hover:bg-white/5 cursor-default",
                      typeStyles[insight.type]
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", typeIconColors[insight.type])} />
                      <div>
                        <p className="text-xs font-semibold text-white/90 mb-1">{insight.title}</p>
                        <p className="text-xs text-white/50 leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
