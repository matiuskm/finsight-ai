# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Name:** FinSight AI — AI Finance Dashboard
**Purpose:** Portfolio piece showcasing modern frontend engineering — glassmorphism UI, smooth animations, and a production-SaaS aesthetic.
**Not a real app:** No backend, no auth, no real data. 100% frontend with dummy JSON data.

---

## Commands

```bash
npm install
npm run dev        # dev server at localhost:3000 (basePath disabled in dev)
npm run build      # static export to /out (for GitHub Pages)
npm run lint
```

---

## Tech Stack (locked — do not replace without user confirmation)

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide Icons |
| Package manager | npm |
| Data | Local dummy JSON (no backend) |
| Deployment | GitHub Pages (static export) |

Do not install new dependencies outside this stack without asking the user first.

---

## Deployment Notes

- `next.config.ts` uses `output: 'export'` and `basePath: '/finsight-ai'` only in production (`NODE_ENV === 'production'`), so `localhost` works without a prefix in dev.
- No API routes, Server Actions, ISR, or middleware — GitHub Pages is static hosting only.
- `images: { unoptimized: true }` is required since GitHub Pages has no image optimization server.
- All "AI" and "API" calls are simulated client-side with `setTimeout` delays.

---

## Architecture

### Data Flow

```
lib/data/*.json          ← raw dummy data
lib/api/get-*.ts         ← async functions with simulated delays (400–1100ms)
app/page.tsx             ← fetches all data via useEffect + useState
components/dashboard/*   ← receives data as props, renders with skeletons
```

Every widget shows a loading skeleton while its data is "fetching". Never leave a blank screen.

### Dummy API Pattern

```ts
import data from "@/lib/data/something.json";
import type { SomeType } from "@/lib/types";

export async function getSomething(): Promise<SomeType[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return data as SomeType[];
}
```

### Folder Structure

```
app/
  layout.tsx              # Inter font, dark class, footer
  page.tsx                # Dashboard — single page, all widgets, "use client"
components/
  ui/                     # shadcn/ui (auto-generated, avoid manual edits)
  dashboard/
    stat-card.tsx         # 4 stat cards with count-up animation
    income-expense-chart.tsx  # Recharts AreaChart/BarChart with toggle
    budget-tracker.tsx    # Progress bars per category, color-coded
    recent-transactions.tsx   # List + Add Transaction modal
    ai-recommendation-panel.tsx  # AI insights with Regenerate button
    dashboard-header.tsx  # Logo, date, bell, avatar
  shared/
    animated-card.tsx     # Reusable glassmorphism card wrapper
    loading-skeleton.tsx  # Skeleton variants per widget type
lib/
  api/                    # get-transactions, get-budget, get-summary, get-ai-insights
  data/                   # transactions.json, budget.json, summary.json, insights.json
  types.ts                # All TypeScript interfaces
  utils.ts                # cn(), formatCurrency, formatCurrencyCompact, formatDate, formatDateShort
```

---

## Design Rules

- **Dark theme only** — `bg-gray-950` base, `dark` class on `<html>`
- **Glassmorphism** on all cards: `backdrop-blur-md`, `bg-white/5`, `border-white/10`
- **Font:** Inter (via `next/font/google`)
- **Currency:** `en-US` locale, USD (`$`)
- **Animation durations:** 150–400ms for micro-interactions, 400–700ms for entrance animations
- **Spacing:** Tailwind scale only (4/8/12/16/24/32) — no arbitrary values
- All reusable visual wrappers go in `components/shared/`, never duplicated

---

## Coding Conventions

- TypeScript strict — no `any` without a comment explaining why
- Always use `cn()` for conditional classNames (never manual template strings)
- All components using hooks or Framer Motion must have `"use client"` as the first line
- File names: `kebab-case.tsx` — Component names: `PascalCase`
- Number formatting: always via helpers in `lib/utils.ts`, never hardcoded

---

## Current Interactions

Three user interactions are implemented — preserve and build on them:

1. **Chart toggle** (`income-expense-chart.tsx`) — Area ↔ Bar chart switch via `useState`
2. **Regenerate AI Insights** (`ai-recommendation-panel.tsx`) — re-calls `getAiInsights()`, shows skeleton while loading, shuffles results
3. **Add Transaction modal** (`recent-transactions.tsx`) — modal form, fake 600ms save delay, prepends new row with animation
