import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-3">
      <Skeleton className="h-3 w-24 bg-white/10" />
      <Skeleton className="h-8 w-36 bg-white/10" />
      <Skeleton className="h-3 w-20 bg-white/10" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4">
      <Skeleton className="h-4 w-40 bg-white/10" />
      <Skeleton className="h-[220px] w-full rounded-xl bg-white/10" />
    </div>
  );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4">
      <Skeleton className="h-4 w-40 bg-white/10" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={cn("flex items-center gap-3", i > 0 && "pt-2")}>
          <Skeleton className="h-9 w-9 rounded-full bg-white/10 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4 bg-white/10" />
            <Skeleton className="h-3 w-1/3 bg-white/10" />
          </div>
          <Skeleton className="h-4 w-16 bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export function BudgetSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4">
      <Skeleton className="h-4 w-36 bg-white/10" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20 bg-white/10" />
            <Skeleton className="h-3 w-16 bg-white/10" />
          </div>
          <Skeleton className="h-2 w-full rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export function InsightSkeleton() {
  return (
    <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 backdrop-blur-md p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded bg-purple-500/20" />
        <Skeleton className="h-4 w-32 bg-purple-500/20" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2 rounded-xl border border-purple-500/10 bg-purple-500/5 p-4">
          <Skeleton className="h-3 w-1/2 bg-purple-500/20" />
          <Skeleton className="h-3 w-full bg-purple-500/10" />
          <Skeleton className="h-3 w-3/4 bg-purple-500/10" />
        </div>
      ))}
    </div>
  );
}
