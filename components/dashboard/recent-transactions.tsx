"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Utensils, Zap, Car, Heart, Clapperboard, TrendingUp, Package, Plus, X } from "lucide-react";
import { AnimatedCard } from "@/components/shared/animated-card";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const categoryIconMap: Record<string, React.ElementType> = {
  Food: Utensils,
  Transport: Car,
  Entertainment: Clapperboard,
  Health: Heart,
  Utilities: Zap,
  Shopping: ShoppingBag,
  Income: TrendingUp,
};

const categoryColorMap: Record<string, string> = {
  Food: "bg-orange-500/15 text-orange-400",
  Transport: "bg-sky-500/15 text-sky-400",
  Entertainment: "bg-violet-500/15 text-violet-400",
  Health: "bg-rose-500/15 text-rose-400",
  Utilities: "bg-yellow-500/15 text-yellow-400",
  Shopping: "bg-pink-500/15 text-pink-400",
  Income: "bg-emerald-500/15 text-emerald-400",
};

const CATEGORIES = ["Food", "Transport", "Entertainment", "Health", "Utilities", "Shopping", "Income"];

const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-colors";

interface AddTransactionModalProps {
  onAdd: (tx: Transaction) => void;
  onClose: () => void;
}

function AddTransactionModal({ onAdd, onClose }: AddTransactionModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim() || !amount) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    onAdd({
      id: `t-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      description: description.trim(),
      category,
      amount: parseFloat(amount),
      type,
    });
    setSaving(false);
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur-xl p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white">Add Transaction</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle */}
          <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs gap-1">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "flex-1 py-1.5 rounded-lg capitalize font-medium transition-all duration-200",
                  type === t
                    ? t === "expense" ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <input
            className={inputClass}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            className={inputClass}
            placeholder="Amount (USD)"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <select
            className={cn(inputClass, "cursor-pointer")}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-gray-900">{c}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Add Transaction"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export function RecentTransactions({ transactions: initial, delay = 0 }: { transactions: Transaction[]; delay?: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initial);
  const [showModal, setShowModal] = useState(false);

  const recent = transactions.slice(0, 8);

  function handleAdd(tx: Transaction) {
    setTransactions((prev) => [tx, ...prev]);
  }

  return (
    <>
      <AnimatedCard delay={delay} className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
            <p className="text-xs text-white/40 mt-0.5">{transactions.length} total this month</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>

        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {recent.map((tx, i) => {
              const Icon = categoryIconMap[tx.category] ?? Package;
              const colorClass = categoryColorMap[tx.category] ?? "bg-white/10 text-white/50";
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -12, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  transition={{ duration: 0.35, delay: i < 3 ? delay + i * 0.06 : 0 }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors cursor-default"
                >
                  <div className={cn("flex items-center justify-center w-9 h-9 rounded-xl shrink-0", colorClass)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/90 truncate">{tx.description}</p>
                    <p className="text-xs text-white/35 mt-0.5">{formatDateShort(tx.date)} · {tx.category}</p>
                  </div>
                  <span className={cn("text-sm font-semibold tabular-nums shrink-0", tx.type === "income" ? "text-emerald-400" : "text-white/70")}>
                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </AnimatedCard>

      <AnimatePresence>
        {showModal && (
          <AddTransactionModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
