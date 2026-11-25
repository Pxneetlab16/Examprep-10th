"use client";

import * as React from "react";
import { Triangle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Right-triangle diagram (pure CSS/SVG)
// ---------------------------------------------------------------------------
function TriangleDiagram() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox="0 0 220 160"
        className="h-auto w-full max-w-[260px]"
        role="img"
        aria-label="Right triangle showing hypotenuse, perpendicular and base with angle theta"
      >
        {/* Triangle */}
        <polygon
          points="30,130 190,130 30,30"
          className="fill-emerald-500/10 stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Right-angle square */}
        <rect
          x="30"
          y="115"
          width="15"
          height="15"
          className="fill-none stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth={1.5}
        />

        {/* Hypotenuse label */}
        <text
          x="115"
          y="74"
          className="fill-rose-600 dark:fill-rose-400"
          fontSize="15"
          fontWeight="700"
        >
          H
        </text>
        <text x="120" y="86" fontSize="9" className="fill-muted-foreground">
          (Hypotenuse)
        </text>

        {/* Perpendicular label */}
        <text
          x="14"
          y="84"
          className="fill-sky-600 dark:fill-sky-400"
          fontSize="15"
          fontWeight="700"
        >
          P
        </text>
        <text x="6" y="98" fontSize="8" className="fill-muted-foreground">
          (Perp.)
        </text>

        {/* Base label */}
        <text
          x="105"
          y="148"
          className="fill-amber-600 dark:fill-amber-400"
          fontSize="15"
          fontWeight="700"
        >
          B
        </text>
        <text x="105" y="160" fontSize="8" className="fill-muted-foreground">
          (Base)
        </text>

        {/* Angle theta arc */}
        <path
          d="M 60 130 A 30 30 0 0 0 50 110"
          className="fill-none stroke-violet-600 dark:stroke-violet-400"
          strokeWidth={1.5}
        />
        <text
          x="63"
          y="120"
          className="fill-violet-600 dark:fill-violet-400"
          fontSize="13"
          fontWeight="700"
        >
          θ
        </text>
      </svg>

      <div className="text-center text-xs text-muted-foreground">
        Pythagoras:{" "}
        <span className="font-mono font-semibold text-foreground">
          H² = P² + B²
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ratio cards
// ---------------------------------------------------------------------------
const RATIOS = [
  {
    sym: "sin θ",
    val: "P / H",
    color: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-900/60",
  },
  {
    sym: "cos θ",
    val: "B / H",
    color: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200 dark:border-sky-900/60",
  },
  {
    sym: "tan θ",
    val: "P / B",
    color: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-900/60",
  },
  {
    sym: "cosec θ",
    val: "H / P",
    color: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-900/60",
  },
  {
    sym: "sec θ",
    val: "H / B",
    color: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-900/60",
  },
  {
    sym: "cot θ",
    val: "B / P",
    color: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-900/60",
  },
];

function RatioGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {RATIOS.map((r) => (
        <div
          key={r.sym}
          className={cn(
            "rounded-lg border bg-card p-2.5 text-center shadow-sm",
            r.border,
          )}
        >
          <div className={cn("text-sm font-bold", r.color)}>{r.sym}</div>
          <div className="mt-0.5 font-mono text-xs text-muted-foreground">
            = {r.val}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Identities
// ---------------------------------------------------------------------------
const IDENTITIES: { title: string; items: string[] }[] = [
  {
    title: "Reciprocal Identities",
    items: [
      "cosec θ = 1 / sin θ",
      "sec θ = 1 / cos θ",
      "cot θ = 1 / tan θ",
    ],
  },
  {
    title: "Quotient Identities",
    items: ["tan θ = sin θ / cos θ", "cot θ = cos θ / sin θ"],
  },
  {
    title: "Pythagorean Identities",
    items: [
      "sin² θ + cos² θ = 1",
      "1 + tan² θ = sec² θ",
      "1 + cot² θ = cosec² θ",
    ],
  },
];

function IdentityCard({ g }: { g: (typeof IDENTITIES)[number] }) {
  return (
    <Card className="p-3">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {g.title}
      </h4>
      <ul className="mt-2 space-y-1">
        {g.items.map((it) => (
          <li
            key={it}
            className="rounded-md bg-muted/40 px-2 py-1.5 font-mono text-xs leading-relaxed sm:text-[13px]"
          >
            {it}
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Value table
// ---------------------------------------------------------------------------
const ANGLES = ["0°", "30°", "45°", "60°", "90°"];
const TABLE_ROWS: { ratio: string; vals: string[]; color: string }[] = [
  {
    ratio: "sin A",
    vals: ["0", "1/2", "1/√2", "√3/2", "1"],
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    ratio: "cos A",
    vals: ["1", "√3/2", "1/√2", "1/2", "0"],
    color: "text-sky-600 dark:text-sky-400",
  },
  {
    ratio: "tan A",
    vals: ["0", "1/√3", "1", "√3", "∞"],
    color: "text-amber-600 dark:text-amber-400",
  },
  {
    ratio: "cosec A",
    vals: ["∞", "2", "√2", "2/√3", "1"],
    color: "text-rose-600 dark:text-rose-400",
  },
  {
    ratio: "sec A",
    vals: ["1", "2/√3", "√2", "2", "∞"],
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    ratio: "cot A",
    vals: ["∞", "√3", "1", "1/√3", "0"],
    color: "text-teal-600 dark:text-teal-400",
  },
];

function ValueTable() {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/60">
          <tr className="border-b">
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
              Ratio
            </th>
            {ANGLES.map((a) => (
              <th
                key={a}
                className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide"
              >
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((r) => (
            <tr
              key={r.ratio}
              className="border-b last:border-0 even:bg-muted/20"
            >
              <td className={cn("px-3 py-2 font-semibold", r.color)}>
                {r.ratio}
              </td>
              {r.vals.map((v, i) => (
                <td
                  key={i}
                  className="px-3 py-2 text-center font-mono tabular-nums"
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export function TrigonometrySection() {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <Triangle className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-tight sm:text-lg">
            Trigonometry — Quick Reference
          </h3>
          <p className="text-xs text-muted-foreground">
            Ratios, identities &amp; standard value table. For learning only.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          <BookOpen className="mr-1 h-3 w-3" />
          Learn
        </Badge>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr]">
        {/* Left: triangle diagram */}
        <Card className="flex items-center justify-center bg-muted/20 p-4">
          <TriangleDiagram />
        </Card>

        {/* Right: ratios */}
        <div className="space-y-3">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Six Trigonometric Ratios
            </h4>
            <RatioGrid />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {IDENTITIES.map((g) => (
          <IdentityCard key={g.title} g={g} />
        ))}
      </div>

      <div className="mt-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Standard Values (0° to 90°)
        </h4>
        <ValueTable />
      </div>
    </Card>
  );
}
