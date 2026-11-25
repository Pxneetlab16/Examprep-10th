"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  FlaskConical,
  Globe2,
  ScrollText,
  Mountain,
  Coins,
  Scale,
  CalendarDays,
  Target,
  RotateCcw,
  CheckCircle2,
  BookOpenCheck,
  Layers,
  Trash2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  subjects,
  type Subject,
  type SubSubject,
  type Chapter,
  scopeKey,
  totalChapters,
} from "@/lib/chapters";
import { useProgress } from "@/hooks/use-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { CountdownClock, EXAM_DATE } from "@/components/countdown-clock";
import { MathFormulas } from "@/components/math-formulas";
import { TrigonometrySection } from "@/components/trigonometry-section";
import { ElementTable } from "@/components/element-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  FlaskConical,
  Globe2,
  ScrollText,
  Mountain,
  Coins,
  Scale,
};

const START_DATE = new Date("2026-12-01T00:00:00+05:30");

function daysBetween(a: Date, b: Date) {
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function useCountdown(target: Date) {
  const [mounted, setMounted] = React.useState(false);
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 60);
    return () => clearInterval(id);
  }, []);
  const diff = mounted ? target.getTime() - now.getTime() : 0;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const mins = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  return { days, hours, mins };
}

function getSubjectProgress(
  subject: Subject,
  progress: ReturnType<typeof useProgress>,
) {
  let total = 0;
  let completed = 0;
  let revisions = 0;
  const scopes: { key: string }[] = [];

  if (subject.chapters) {
    for (const c of subject.chapters) {
      const key = scopeKey({ subjectId: subject.id, chapterNumber: c.number });
      scopes.push({ key });
      total++;
      const st = progress.getState(key);
      if (st.completed) completed++;
      revisions += st.revisions.filter(Boolean).length;
    }
  } else if (subject.subSubjects) {
    for (const ss of subject.subSubjects) {
      for (const c of ss.chapters) {
        const key = scopeKey({
          subjectId: subject.id,
          subId: ss.id,
          chapterNumber: c.number,
        });
        scopes.push({ key });
        total++;
        const st = progress.getState(key);
        if (st.completed) completed++;
        revisions += st.revisions.filter(Boolean).length;
      }
    }
  }

  return { total, completed, revisions };
}

// ---------------------------------------------------------------------------
// Chapter row
// ---------------------------------------------------------------------------
function ChapterRow({
  chapter,
  scopeKeyStr,
  index,
}: {
  chapter: Chapter;
  scopeKeyStr: string;
  index: number;
}) {
  const { hydrated, getState, toggleCompleted, toggleRevision } = useProgress();
  const state = getState(scopeKeyStr);

  // revision gating for visibility of "can be checked" - we use disabled state
  const rev1Enabled = hydrated && state.completed;
  const rev2Enabled = hydrated && state.revisions[0];
  const rev3Enabled = hydrated && state.revisions[1];

  const allDone =
    state.completed &&
    state.revisions[0] &&
    state.revisions[1] &&
    state.revisions[2];

  return (
    <tr
      className={cn(
        "group transition-colors",
        allDone
          ? "bg-emerald-50/60 dark:bg-emerald-950/20"
          : state.completed
            ? "bg-muted/40"
            : index % 2 === 0
              ? "bg-background"
              : "bg-muted/20",
      )}
    >
      <td className="px-3 py-3 align-middle sm:px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-muted/50 text-xs font-semibold tabular-nums">
          {chapter.number}
        </div>
      </td>
      <td className="px-3 py-3 align-middle sm:px-4">
        <div className="font-medium leading-tight">{chapter.name}</div>
        {chapter.punjabi && (
          <div className="mt-0.5 text-xs text-muted-foreground">
            {chapter.punjabi}
          </div>
        )}
      </td>
      <td className="px-2 py-3 text-center align-middle sm:px-3">
        <div className="flex justify-center">
          <Checkbox
            checked={state.completed}
            onCheckedChange={() => toggleCompleted(scopeKeyStr)}
            aria-label={`Mark chapter ${chapter.number} as completed`}
            className="h-5 w-5 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 dark:data-[state=checked]:bg-emerald-500 dark:data-[state=checked]:border-emerald-500"
          />
        </div>
      </td>
      <td className="px-2 py-3 text-center align-middle sm:px-3">
        <div className="flex justify-center">
          <Checkbox
            checked={state.revisions[0]}
            disabled={!rev1Enabled}
            onCheckedChange={() => toggleRevision(scopeKeyStr, 0)}
            aria-label={`1st revision of chapter ${chapter.number}`}
            className="h-5 w-5 data-[state=checked]:bg-sky-600 data-[state=checked]:border-sky-600 dark:data-[state=checked]:bg-sky-500 dark:data-[state=checked]:border-sky-500"
          />
        </div>
      </td>
      <td className="px-2 py-3 text-center align-middle sm:px-3">
        <div className="flex justify-center">
          <Checkbox
            checked={state.revisions[1]}
            disabled={!rev2Enabled}
            onCheckedChange={() => toggleRevision(scopeKeyStr, 1)}
            aria-label={`2nd revision of chapter ${chapter.number}`}
            className="h-5 w-5 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 dark:data-[state=checked]:bg-violet-500 dark:data-[state=checked]:border-violet-500"
          />
        </div>
      </td>
      <td className="px-2 py-3 text-center align-middle sm:px-3">
        <div className="flex justify-center">
          <Checkbox
            checked={state.revisions[2]}
            disabled={!rev3Enabled}
            onCheckedChange={() => toggleRevision(scopeKeyStr, 2)}
            aria-label={`3rd revision of chapter ${chapter.number}`}
            className="h-5 w-5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 dark:data-[state=checked]:bg-amber-500 dark:data-[state=checked]:border-amber-500"
          />
        </div>
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Chapter table
// ---------------------------------------------------------------------------
function ChapterTable({
  title,
  punjabiTitle,
  icon,
  chapters,
  subjectId,
  subId,
}: {
  title: string;
  punjabiTitle?: string;
  icon: string;
  chapters: Chapter[];
  subjectId: string;
  subId?: string;
}) {
  const Icon = ICONS[icon] ?? BookOpenCheck;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-semibold leading-tight sm:text-lg">
              {title}
            </h3>
            {punjabiTitle && (
              <p className="text-xs text-muted-foreground">{punjabiTitle}</p>
            )}
          </div>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {chapters.length} chapters
        </Badge>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="bg-muted/60">
            <tr className="border-b text-left">
              <th className="w-16 px-3 py-3 text-xs font-semibold uppercase tracking-wide sm:px-4">
                Ch. No.
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide sm:px-4">
                Chapter Name
              </th>
              <th className="w-24 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide sm:px-3">
                Completed
              </th>
              <th className="w-20 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide sm:px-3">
                Rev. 1
              </th>
              <th className="w-20 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide sm:px-3">
                Rev. 2
              </th>
              <th className="w-20 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide sm:px-3">
                Rev. 3
              </th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((c, i) => (
              <ChapterRow
                key={`${subjectId}:${subId ?? "-"}:${c.number}`}
                chapter={c}
                scopeKeyStr={scopeKey({
                  subjectId,
                  subId,
                  chapterNumber: c.number,
                })}
                index={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subject view
// ---------------------------------------------------------------------------
function SubjectView({ subject }: { subject: Subject }) {
  const progress = useProgress();
  const stats = getSubjectProgress(subject, progress);
  const pct =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none bg-gradient-to-br from-primary/5 via-card to-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold sm:text-2xl">{subject.name}</h2>
              <Badge variant="outline" className="text-xs">
                {subject.punjabi}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {stats.completed} of {stats.total} chapters completed ·{" "}
              {stats.revisions} revisions logged
            </p>
          </div>
          <div className="w-full max-w-xs">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Completion</span>
              <span className="font-semibold tabular-nums">{pct}%</span>
            </div>
            <Progress value={pct} className="h-2" />
          </div>
        </div>
      </Card>

      {subject.chapters && (
        <ChapterTable
          title={`${subject.name} — All Chapters`}
          punjabiTitle={subject.punjabi}
          icon={subject.icon}
          chapters={subject.chapters}
          subjectId={subject.id}
        />
      )}

      {subject.subSubjects && (
        <div className="space-y-8">
          {subject.subSubjects.map((ss: SubSubject) => (
            <ChapterTable
              key={ss.id}
              title={ss.name}
              punjabiTitle={ss.punjabi}
              icon={ss.icon}
              chapters={ss.chapters}
              subjectId={subject.id}
              subId={ss.id}
            />
          ))}
        </div>
      )}

      {/* Math-only learn sections: Formulas + Trigonometry */}
      {subject.id === "math" && (
        <div className="space-y-6 pt-2">
          <MathFormulas />
          <TrigonometrySection />
        </div>
      )}

      {/* Science-only learn section: Element table */}
      {subject.id === "science" && (
        <div className="space-y-6 pt-2">
          <ElementTable />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
function CreatorBar() {
  return (
    <div className="w-full border-b bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-1 sm:px-6">
        <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide sm:text-xs">
          <Sparkles className="h-3 w-3 shrink-0" />
          <span>Created by:</span>
          <span className="font-semibold">Puneet Singh</span>
        </span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <CreatorBar />
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          {/* Left: logo + live countdown clock */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-border">
                <img
                  src="/icon-192.png"
                  alt="Exam Prep logo"
                  className="h-full w-full object-cover"
                  width={36}
                  height={36}
                />
              </span>
              <div className="leading-tight">
                <div className="text-base font-bold sm:text-lg">Exam Prep</div>
                <div className="text-[11px] text-muted-foreground">
                  Class 10 · Session 2026–2027
                </div>
              </div>
            </div>

            <span className="hidden h-8 w-px bg-border sm:block" />

            {/* Live reverse countdown clock — top left */}
            <CountdownClock />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-lg border bg-muted/40 px-3 py-1.5 text-xs md:flex">
              <CalendarDays className="h-3.5 w-3.5 text-rose-500" />
              <span className="text-muted-foreground">Boards begin</span>
              <span className="font-semibold">19 March 2027</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero / Overview
// ---------------------------------------------------------------------------
function Hero({
  progress,
}: {
  progress: ReturnType<typeof useProgress>;
}) {
  const countdown = useCountdown(EXAM_DATE);
  const total = totalChapters();

  let completed = 0;
  let revisions = 0;
  for (const s of subjects) {
    const st = getSubjectProgress(s, progress);
    completed += st.completed;
    revisions += st.revisions;
  }
  const overallPct =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const planDays = Math.max(1, daysBetween(START_DATE, EXAM_DATE));
  // Derive elapsed days from the countdown (mount-safe) instead of calling
  // new Date() during render (which would cause a hydration mismatch).
  const elapsed = Math.max(0, Math.min(planDays, planDays - countdown.days));
  const planPct = Math.min(100, Math.round((elapsed / planDays) * 100));

  const months = [
    {
      name: "December 2026",
      sub: "Foundation & First Pass",
      days: "Dec 1 – 31",
    },
    {
      name: "January 2027",
      sub: "Practice & 1st Revision",
      days: "Jan 1 – 31",
    },
    {
      name: "February 2027",
      sub: "Final Revision & Mocks",
      days: "Feb 1 – 28",
    },
  ];

  return (
    <section className="space-y-6">
      <Card className="overflow-hidden border-none bg-gradient-to-br from-foreground/[0.04] via-card to-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              3-Month Board Prep Tracker
            </Badge>
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Class 10 Board Exam Prep
              <span className="block text-muted-foreground text-lg font-medium sm:text-xl">
                December → January → February · Exams on 19 March 2027
              </span>
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Track every chapter of <strong>Math</strong>,{" "}
              <strong>Science</strong> and <strong>Social Science</strong>.
              Tick the chapter when completed, then tick the revision columns
              on each re-pass — up to 3 revisions per chapter. Your progress is
              saved automatically on this device.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
                <Target className="h-4 w-4 text-rose-500" />
                <span className="text-muted-foreground">Overall</span>
                <span className="font-semibold tabular-nums">
                  {completed}/{total} chapters
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
                <RotateCcw className="h-4 w-4 text-violet-500" />
                <span className="text-muted-foreground">Revisions</span>
                <span className="font-semibold tabular-nums">{revisions}</span>
              </div>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            <Card className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Days to Boards
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold tabular-nums text-rose-600 dark:text-rose-400">
                  {countdown.days}
                </span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground tabular-nums">
                {countdown.hours}h {countdown.mins}m remaining
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Completion
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold tabular-nums">
                  {overallPct}
                  <span className="text-base">%</span>
                </span>
              </div>
              <Progress value={overallPct} className="mt-2 h-1.5" />
            </Card>
          </div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        {months.map((m, i) => (
          <Card key={m.name} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {m.days}
                  </div>
                </div>
              </div>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{m.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Prep Timeline</div>
            <div className="text-xs text-muted-foreground">
              {elapsed} of {planDays} days elapsed
            </div>
          </div>
          <span className="text-sm font-semibold tabular-nums">{planPct}%</span>
        </div>
        <Progress value={planPct} className="mt-2 h-2" />
      </Card>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Subject tabs
// ---------------------------------------------------------------------------
function SubjectTabs() {
  const [active, setActive] = React.useState<string>("math");
  const progress = useProgress();

  return (
    <Tabs value={active} onValueChange={setActive} className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-lg bg-muted/40 p-1 sm:w-auto">
          {subjects.map((s) => {
            const Icon = ICONS[s.icon] ?? BookOpenCheck;
            const st = getSubjectProgress(s, progress);
            return (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs sm:flex-row sm:gap-2 sm:text-sm",
                  s.accent,
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{s.short}</span>
                <span className="hidden text-[10px] text-muted-foreground sm:inline">
                  {st.completed}/{st.total}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="flex items-center justify-end gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                Reset All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently clear every chapter completion and
                  revision tick across all three subjects. This cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    progress.resetAll();
                    toast({
                      title: "Progress reset",
                      description: "All chapters marked as not started.",
                    });
                  }}
                >
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {subjects.map((s) => (
        <TabsContent key={s.id} value={s.id} className="mt-0 focus-visible:outline-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <SubjectView subject={s} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      ))}
    </Tabs>
  );
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------
function Legend() {
  const items = [
    {
      label: "Chapter Completed",
      color: "bg-emerald-600 dark:bg-emerald-500",
      desc: "First time you finish the chapter",
    },
    {
      label: "1st Revision",
      color: "bg-sky-600 dark:bg-sky-500",
      desc: "Enabled after the chapter is completed",
    },
    {
      label: "2nd Revision",
      color: "bg-violet-600 dark:bg-violet-500",
      desc: "Enabled after 1st revision is ticked",
    },
    {
      label: "3rd Revision",
      color: "bg-amber-600 dark:bg-amber-500",
      desc: "Enabled after 2nd revision is ticked",
    },
  ];
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">How it works</h3>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.label} className="flex items-start gap-2 text-xs">
            <span
              className={cn(
                "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] text-white",
                it.color,
              )}
            >
              <CheckCircle2 className="h-3 w-3" />
            </span>
            <span>
              <span className="font-medium text-foreground">{it.label}</span>
              <span className="block text-muted-foreground">{it.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded bg-black ring-1 ring-border">
              <img
                src="/icon-192.png"
                alt="Exam Prep logo"
                className="h-full w-full object-cover"
                width={20}
                height={20}
              />
            </span>
            <span>
              <strong className="text-foreground">Exam Prep</strong> · Class 10
              Board Tracker · Session 2026–2027
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>Target:</span>
            <span className="font-semibold text-foreground">19 March 2027</span>
            <ChevronRight className="h-3 w-3" />
            <span>Math · Science · Social Science</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Page() {
  const progress = useProgress();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        <Hero progress={progress} />
        <SubjectTabs />
        <Legend />
      </main>
      <Footer />
    </div>
  );
}
