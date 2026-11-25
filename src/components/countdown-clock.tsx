"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlarmClock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const TARGET = new Date("2027-03-19T09:00:00+05:30"); // Boards begin 19 March 2027, 9:00 AM IST

function useNow() {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function pad(n: number, len = 2) {
  return String(Math.max(0, n)).padStart(len, "0");
}

function TimeBlock({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "min-w-[2.75rem] rounded-md border bg-card px-2 py-1.5 text-center tabular-nums shadow-sm sm:min-w-[3rem] sm:px-2.5 sm:py-2",
          accent,
        )}
      >
        <motion.span
          key={value}
          initial={{ opacity: 0.4, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="block text-lg font-bold leading-none sm:text-2xl"
        >
          {pad(value)}
        </motion.span>
      </div>
      <span className="mt-1 text-[9px] uppercase tracking-wide text-muted-foreground sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

export function CountdownClock() {
  const [mounted, setMounted] = React.useState(false);
  const now = useNow();
  React.useEffect(() => setMounted(true), []);

  // Stable placeholder for SSR (avoids hydration mismatch). After mount we
  // compute the live countdown.
  const diff = mounted ? Math.max(0, TARGET.getTime() - now) : 0;

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const mins = Math.floor((diff / 60_000) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
        <AlarmClock className="h-3.5 w-3.5 text-rose-500" />
        <span>Live countdown to Boards</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <TimeBlock
          value={days}
          label="Days"
          accent="border-rose-200 text-rose-600 dark:border-rose-900/60 dark:text-rose-400"
        />
        <span className="-mt-3 text-base font-bold text-muted-foreground/60 sm:text-xl">
          :
        </span>
        <TimeBlock
          value={hours}
          label="Hours"
          accent="border-amber-200 text-amber-600 dark:border-amber-900/60 dark:text-amber-400"
        />
        <span className="-mt-3 text-base font-bold text-muted-foreground/60 sm:text-xl">
          :
        </span>
        <TimeBlock
          value={mins}
          label="Min"
          accent="border-emerald-200 text-emerald-600 dark:border-emerald-900/60 dark:text-emerald-400"
        />
        <span className="-mt-3 text-base font-bold text-muted-foreground/60 sm:text-xl">
          :
        </span>
        <TimeBlock
          value={secs}
          label="Sec"
          accent="border-sky-200 text-sky-600 dark:border-sky-900/60 dark:text-sky-400"
        />
        <div className="ml-1 hidden items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-400 sm:flex">
          <Flame className="h-3 w-3" />
          19 Mar 2027
        </div>
      </div>
    </div>
  );
}

export { TARGET as EXAM_DATE };
