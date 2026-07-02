"use client";

import { motion } from "framer-motion";
import { Sparkles, Bell } from "lucide-react";

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/30">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">FinSight AI</h1>
          <p className="text-xs text-white/40 uppercase tracking-widest">Finance Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm text-white/40 hidden sm:block">June 2025</p>
        <button className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
          <Bell className="w-4 h-4 text-white/60" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
        </button>
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/30">
          A
        </div>
      </div>
    </motion.header>
  );
}
