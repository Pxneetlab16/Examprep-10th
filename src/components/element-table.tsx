"use client";

import * as React from "react";
import { Atom, Layers, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  first20Elements,
  importantHeavyElements,
  SHELL_NAMES,
  categoryColors,
  type Element,
} from "@/lib/elements";

function ElementCard({ el }: { el: Element }) {
  const cat = categoryColors[el.category];
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-3 transition-colors hover:border-primary/40",
        cat.bg,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-semibold tabular-nums text-muted-foreground">
            {el.atomicNumber}
          </div>
          <div className={cn("text-2xl font-bold leading-none", cat.text)}>
            {el.symbol}
          </div>
          <div className="mt-0.5 text-[11px] font-medium leading-tight">
            {el.name}
          </div>
        </div>
        <Badge variant="outline" className="text-[9px]">
          {cat.label}
        </Badge>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1 text-[10px]">
        <div>
          <div className="text-muted-foreground">Valency</div>
          <div className="font-mono font-semibold">{el.valency}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Valence e⁻</div>
          <div className="font-mono font-semibold">{el.valenceElectrons}</div>
        </div>
      </div>
    </Card>
  );
}

function ShellRow({ el }: { el: Element }) {
  const cat = categoryColors[el.category];
  return (
    <tr className="border-b last:border-0 even:bg-muted/20">
      <td className="px-2 py-2 text-center">
        <span className="font-mono font-semibold tabular-nums">
          {el.atomicNumber}
        </span>
      </td>
      <td className="px-2 py-2">
        <span className={cn("font-mono font-bold", cat.text)}>
          {el.symbol}
        </span>
      </td>
      <td className="px-2 py-2 text-xs font-medium">{el.name}</td>
      <td className="px-2 py-2 text-center font-mono text-xs">
        {el.valency}
      </td>
      <td className="px-2 py-2 text-center font-mono text-xs">
        {el.valenceElectrons}
      </td>
      <td className="px-2 py-2 text-center">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {el.shellsArr.map((n, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-0.5 rounded-md border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] tabular-nums"
            >
              <span className="text-muted-foreground">
                {SHELL_NAMES[i]}
              </span>
              <span className="font-semibold">{n}</span>
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}

export function ElementTable() {
  return (
    <div className="space-y-6">
      {/* First 20 elements — detailed table */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Atom className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-semibold leading-tight sm:text-lg">
              First 20 Elements — Electronic Configuration
            </h3>
            <p className="text-xs text-muted-foreground">
              Atomic number, name, symbol, valency, valence electrons &amp;
              shells (K L M N).
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            <Layers className="mr-1 h-3 w-3" />
            20 elements
          </Badge>
        </div>

        {/* Mobile: card grid; Desktop: table */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden md:grid-cols-3">
          {first20Elements.map((el) => (
            <ElementCard key={el.atomicNumber} el={el} />
          ))}
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-lg border sm:block">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead className="bg-muted/60">
              <tr className="border-b text-left">
                <th className="w-12 px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide">
                  No.
                </th>
                <th className="w-14 px-2 py-2 text-[11px] font-semibold uppercase tracking-wide">
                  Sym.
                </th>
                <th className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide">
                  Name
                </th>
                <th className="w-20 px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide">
                  Valency
                </th>
                <th className="w-24 px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide">
                  Valence e⁻
                </th>
                <th className="px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide">
                  Shells (K L M N O P)
                </th>
              </tr>
            </thead>
            <tbody>
              {first20Elements.map((el) => (
                <ShellRow key={el.atomicNumber} el={el} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Important heavy elements */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Atom className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-semibold leading-tight sm:text-lg">
              Important Heavy Elements (Z &gt; 20)
            </h3>
            <p className="text-xs text-muted-foreground">
              10 commonly-used elements in Class 10 — Fe, Cu, Zn, Br, Ag, I, Ba,
              Au, Hg, Pb.
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            10 elements
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {importantHeavyElements.map((el) => (
            <ElementCard key={el.atomicNumber} el={el} />
          ))}
        </div>
      </Card>

      {/* Legend */}
      <Card className="bg-muted/20 p-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Legend &amp; Notes</h3>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(categoryColors).map(([key, c]) => (
            <span
              key={key}
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium",
                c.bg,
                c.text,
              )}
            >
              <span className="h-2 w-2 rounded-sm bg-current" />
              {c.label}
            </span>
          ))}
        </div>
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          <li>
            • <strong>K, L, M, N, O, P</strong> are shell names; number next to
            each = electrons in that shell.
          </li>
          <li>
            • Maximum electrons per shell: K=2, L=8, M=18, N=32 (Bohr model
            simplification for Class 10).
          </li>
          <li>
            • <strong>Valence electrons</strong> = electrons in the outermost
            shell. <strong>Valency</strong> = combining capacity (usually 8 −
            valence e⁻ for non-metals, or = valence e⁻ for metals).
          </li>
          <li>
            • Some elements show variable valency (e.g. Fe²⁺/Fe³⁺, Cu⁺/Cu²⁺,
            Hg⁺/Hg²⁺).
          </li>
        </ul>
      </Card>
    </div>
  );
}
