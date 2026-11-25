"use client";

import * as React from "react";
import { Sigma, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { mathFormulas, formulaCategories, type Formula } from "@/lib/formulas";

function FormulaCard({ f, i }: { f: Formula; i: number }) {
  return (
    <Card className="group relative overflow-hidden p-3 transition-colors hover:border-primary/40 hover:bg-muted/30">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold tabular-nums text-primary">
            {i + 1}
          </span>
          <span className="text-xs font-semibold leading-tight">
            {f.name}
          </span>
        </div>
      </div>
      <div className="mt-2 rounded-md bg-muted/50 px-2.5 py-2 font-mono text-[13px] leading-relaxed tracking-tight sm:text-sm">
        {f.formula}
      </div>
    </Card>
  );
}

export function MathFormulas() {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Sigma className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-tight sm:text-lg">
            Important Formulas
          </h3>
          <p className="text-xs text-muted-foreground">
            {mathFormulas.length} key formulas across all chapters — for quick
            learning & revision.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          <Filter className="mr-1 h-3 w-3" />
          By category
        </Badge>
      </div>

      <Tabs defaultValue="Algebra" className="mt-4">
        <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-lg bg-muted/40 p-1 sm:flex-row">
          {formulaCategories.map((c) => {
            const count = mathFormulas.filter((f) => f.category === c).length;
            return (
              <TabsTrigger
                key={c}
                value={c}
                className="flex-1 rounded-md px-2 py-1.5 text-[11px] sm:text-xs"
              >
                {c}
                <span className="ml-1 text-[9px] text-muted-foreground">
                  {count}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {formulaCategories.map((c) => (
          <TabsContent key={c} value={c} className="mt-4 focus-visible:outline-none">
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {mathFormulas
                .filter((f) => f.category === c)
                .map((f, idx) => (
                  <FormulaCard
                    key={f.name}
                    f={f}
                    i={mathFormulas.indexOf(f)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
