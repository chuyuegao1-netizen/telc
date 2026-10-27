import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, Headphones, RotateCcw } from "lucide-react";
import { cards, exams, groups } from "@/data";
import { clearProgress, loadProgress, type SetProgress } from "@/lib/progress";

export function HomeView() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Record<string, SetProgress>>({});
  const [group, setGroup] = useState<(typeof groups)[number] | "全部">("全部");

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const stats = useMemo(() => {
    const rows = Object.values(progress);
    const attempted = rows.length;
    const ratio =
      rows.length === 0
        ? 0
        : rows.reduce((sum, row) => sum + row.best / row.total, 0) / rows.length;
    const wrong = rows.reduce((sum, row) => sum + row.wrong.length, 0);
    return { attempted, ratio, wrong };
  }, [progress]);

  const visibleExams = exams.filter((set) => group === "全部" || set.group === group);
  const visibleCards = cards.filter((set) => group === "全部" || set.group === group);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Hörverstehen 1</p>
        <h1 className="mt-2 font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl">HörRaum</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          八个人，各自说一通。你要选出每人真正的立场。先读原文，再对概括句，交卷后对答案。
        </p>
      </header>

      <section className="mt-8 grid grid-cols-3 gap-3 sm:max-w-lg">
        <Stat label="练过" value={String(stats.attempted)} hint={`共 ${exams.length} 套可模考`} />
        <Stat label="最好均分" value={stats.attempted ? `${Math.round(stats.ratio * 100)}%` : "—"} hint="按各套最高分" />
        <Stat label="还没收拾的错题" value={String(stats.wrong)} hint="留在每套里" />
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg"
          onClick={() => {
            const pick = exams[Math.floor(Math.random() * exams.length)];
            navigate({ to: "/exam/$setId", params: { setId: pick.id } });
          }}
        >
          <Headphones className="size-4" aria-hidden />
          随机一套
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-muted"
          onClick={() => {
            clearProgress();
            setProgress({});
          }}
        >
          <RotateCcw className="size-4" aria-hidden />
          清空记录
        </button>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar">
        {(["全部", ...groups] as const).map((item) => {
          const on = group === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setGroup(item)}
              className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${
                on ? "bg-ink text-paper" : "bg-paper text-muted ring-1 ring-line"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {visibleExams.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-2xl text-ink">可以模考</h2>
          <p className="mt-1 text-sm text-muted">有原文，也有对应的概括句。八句都要用上，这批题没有多出来的干扰项。</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {visibleExams.map((set) => {
              const row = progress[set.id];
              return (
                <li key={set.id}>
                  <Link
                    to="/exam/$setId"
                    params={{ setId: set.id }}
                    className="flex h-full flex-col rounded-2xl bg-paper p-4 ring-1 ring-line transition-colors hover:ring-primary"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-primary uppercase">{set.group}</p>
                        <h3 className="mt-1 font-display text-2xl leading-tight text-ink">{set.title}</h3>
                        <p className="text-sm text-muted">{set.titleZh}</p>
                      </div>
                      <ScoreMark row={row} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{set.blurb}</p>
                    {row && row.wrong.length > 0 && (
                      <p className="mt-3 text-sm font-semibold text-accent">上次还有 {row.wrong.length} 人没对上</p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {visibleCards.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink">只有选项，先精读</h2>
          <p className="mt-1 text-sm text-muted">这些新题笔记里没有说话人原文，不能诚实计分。先把概括句读到能立刻反应。</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {visibleCards.map((set) => (
              <li key={set.id}>
                <Link
                  to="/karten/$setId"
                  params={{ setId: set.id }}
                  className="flex h-full gap-3 rounded-2xl bg-paper p-4 ring-1 ring-line transition-colors hover:ring-primary"
                >
                  <BookOpen className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-primary uppercase">{set.group}</p>
                    <h3 className="mt-1 font-display text-2xl leading-tight text-ink">{set.title}</h3>
                    <p className="text-sm text-muted">
                      {set.titleZh} · {set.cards.length} 句
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl bg-paper px-3 py-3 ring-1 ring-line">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums text-ink">{value}</p>
      <p className="text-xs text-muted">{hint}</p>
    </div>
  );
}

function ScoreMark({ row }: { row?: SetProgress }) {
  if (!row) {
    return <span className="rounded-full bg-deep px-2.5 py-1 text-xs font-semibold text-muted">未练</span>;
  }
  const good = row.best >= row.total - 1;
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${
        good ? "bg-good-bg text-good" : "bg-mark text-ink"
      }`}
    >
      最高 {row.best}/{row.total}
    </span>
  );
}
