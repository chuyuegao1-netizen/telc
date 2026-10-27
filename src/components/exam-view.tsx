import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock, Languages } from "lucide-react";
import type { ExamSet, Speaker } from "@/data";
import { loadProgress, patchWrong, saveFullAttempt, type SetProgress } from "@/lib/progress";

type Phase = "intro" | "run" | "read" | "done";
type Option = { id: number; letter: string; claim: string; claimZh: string };
type Result = {
  correct: number;
  total: number;
  wrong: number[];
  picks: Record<number, number>;
  full: boolean;
};

const LETTERS = "ABCDEFGHIJ";
const LIMIT = 16 * 60;

function shuffle<T>(list: T[]): T[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ExamView({ set }: { set: ExamSet }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [timed, setTimed] = useState(true);
  const [showZh, setShowZh] = useState(false);
  const [left, setLeft] = useState(LIMIT);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [subset, setSubset] = useState<number[] | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [saved, setSaved] = useState<SetProgress | undefined>();
  const finishedRef = useRef(false);
  const picksRef = useRef(picks);
  picksRef.current = picks;

  useEffect(() => {
    setSaved(loadProgress()[set.id]);
  }, [set.id]);

  const active = useMemo(
    () => (subset ? set.speakers.filter((speaker) => subset.includes(speaker.n)) : set.speakers),
    [set.speakers, subset],
  );
  const current = active[index];

  useEffect(() => {
    if (phase !== "run" || !timed) return;
    const id = window.setInterval(() => {
      setLeft((value) => (value <= 1 ? 0 : value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, timed]);

  useEffect(() => {
    if (phase !== "run") {
      finishedRef.current = false;
      return;
    }
    if (timed && left === 0 && !finishedRef.current) {
      finishedRef.current = true;
      finish(picksRef.current);
    }
    // finish closes over the attempt that is already on screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, phase, timed]);

  function begin(nextSubset: number[] | null) {
    const pool = shuffle(set.speakers).map((speaker, i) => ({
      id: speaker.n,
      letter: LETTERS[i],
      claim: speaker.claim,
      claimZh: speaker.claimZh,
    }));
    setSubset(nextSubset);
    setOptions(pool);
    setPicks({});
    setIndex(0);
    setLeft(LIMIT);
    setResult(null);
    setOpen(null);
    setShowZh(false);
    setPhase("run");
  }

  function finish(source: Record<number, number>) {
    const people = subset ? set.speakers.filter((speaker) => subset.includes(speaker.n)) : set.speakers;
    const wrong = people.filter((speaker) => source[speaker.n] !== speaker.n).map((speaker) => speaker.n);
    const full = people.length === set.speakers.length;
    const correct = people.length - wrong.length;
    if (full) setSaved(saveFullAttempt(set.id, correct, people.length, wrong));
    else patchWrong(set.id, people.map((speaker) => speaker.n), wrong);
    setResult({ correct, total: people.length, wrong, picks: source, full });
    setPhase("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function choose(optionId: number) {
    if (!current) return;
    setPicks((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (next[Number(key)] === optionId) delete next[Number(key)];
      }
      next[current.n] = optionId;
      return next;
    });
    setIndex((value) => Math.min(active.length - 1, value + 1));
  }

  const filled = active.filter((speaker) => picks[speaker.n] !== undefined).length;

  return (
    <main className={`mx-auto w-full px-4 pb-28 pt-5 sm:px-6 sm:pt-8 ${phase === "run" ? "max-w-6xl" : "max-w-3xl"}`}>
      <Link to="/" className="inline-flex h-10 items-center gap-1 text-sm font-semibold text-muted">
        <ArrowLeft className="size-4" aria-hidden />
        题库
      </Link>

      {phase === "intro" && (
        <Intro
          set={set}
          saved={saved}
          timed={timed}
          setTimed={setTimed}
          onStart={() => begin(null)}
          onWrong={() => saved && begin(saved.wrong)}
          onRead={() => {
            setShowZh(false);
            setPhase("read");
          }}
        />
      )}

      {phase === "read" && (
        <ReadMode set={set} showZh={showZh} onZh={() => setShowZh((value) => !value)} onBack={() => setPhase("intro")} />
      )}

      {phase === "run" && current && (
        <Run
          set={set}
          active={active}
          current={current}
          index={index}
          setIndex={setIndex}
          options={options}
          picks={picks}
          filled={filled}
          timed={timed}
          left={left}
          showZh={showZh}
          onZh={() => setShowZh((value) => !value)}
          onChoose={choose}
          onFinish={() => finish(picks)}
        />
      )}

      {phase === "done" && result && (
        <Done
          set={set}
          result={result}
          options={options}
          open={open}
          setOpen={setOpen}
          showZh={showZh}
          onZh={() => setShowZh((value) => !value)}
          onAgain={() => begin(null)}
          onWrong={() => begin(result.wrong)}
        />
      )}
    </main>
  );
}

function Intro({
  set,
  saved,
  timed,
  setTimed,
  onStart,
  onWrong,
  onRead,
}: {
  set: ExamSet;
  saved?: SetProgress;
  timed: boolean;
  setTimed: (value: boolean) => void;
  onStart: () => void;
  onWrong: () => void;
  onRead: () => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">{set.group}</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{set.title}</h1>
      <p className="mt-1 text-lg text-muted">{set.titleZh}</p>
      <ol className="mt-6 space-y-3 text-base leading-relaxed">
        <li className="rounded-2xl bg-paper p-4 ring-1 ring-line">1. 按 1 到 8 读原文。没有录音，阅读就是这一遍听力。</li>
        <li className="rounded-2xl bg-paper p-4 ring-1 ring-line">2. 选出最贴切的概括句。每句只用一次，点别人用过的会换过来。</li>
        <li className="rounded-2xl bg-paper p-4 ring-1 ring-line">3. 八个人都选完再交卷。中文对照默认关掉。</li>
      </ol>
      <label className="mt-4 flex h-12 items-center justify-between rounded-2xl bg-paper px-4 ring-1 ring-line">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <Clock className="size-4 text-primary" aria-hidden />
          计时 16 分钟
        </span>
        <input type="checkbox" checked={timed} onChange={(event) => setTimed(event.target.checked)} className="size-5 accent-primary" />
      </label>
      {saved && (
        <p className="mt-4 text-sm text-muted">
          练过 {saved.attempts} 次，最高 {saved.best}/{saved.total}，最近 {saved.last}/{saved.total}。
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={onStart} className="h-12 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg">
          开始这套
        </button>
        {saved && saved.wrong.length > 0 && (
          <button type="button" onClick={onWrong} className="h-12 rounded-full bg-paper px-5 text-sm font-semibold text-ink ring-1 ring-line">
            只重做 {saved.wrong.length} 道错题
          </button>
        )}
        <button type="button" onClick={onRead} className="h-12 rounded-full px-4 text-sm font-semibold text-primary">
          先对照精读
        </button>
      </div>
    </div>
  );
}

function Run({
  set,
  active,
  current,
  index,
  setIndex,
  options,
  picks,
  filled,
  timed,
  left,
  showZh,
  onZh,
  onChoose,
  onFinish,
}: {
  set: ExamSet;
  active: Speaker[];
  current: Speaker;
  index: number;
  setIndex: (value: number) => void;
  options: Option[];
  picks: Record<number, number>;
  filled: number;
  timed: boolean;
  left: number;
  showZh: boolean;
  onZh: () => void;
  onChoose: (id: number) => void;
  onFinish: () => void;
}) {
  const ownerOf = (id: number) => active.find((speaker) => picks[speaker.n] === id)?.n;
  const urgent = timed && left < 60;

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">{set.title}</p>
          <p className="text-sm text-muted">
            已选 {filled}/{active.length}
            {active.length < set.speakers.length ? " · 错题重做" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onZh}
            className={`inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold ${
              showZh ? "bg-mark text-ink" : "text-muted"
            }`}
          >
            <Languages className="size-4" aria-hidden />
            中文
          </button>
          {timed && (
            <span className={`font-display text-2xl tabular-nums ${urgent ? "text-accent" : "text-ink"}`}>{formatTime(left)}</span>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {active.map((speaker, i) => {
          const on = i === index;
          const done = picks[speaker.n] !== undefined;
          return (
            <button
              key={speaker.n}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-11 w-11 shrink-0 rounded-full text-sm font-semibold tabular-nums ${
                on ? "bg-primary text-primary-fg" : done ? "bg-mark text-ink" : "bg-paper text-muted ring-1 ring-line"
              }`}
            >
              {speaker.n}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid items-start gap-4 md:grid-cols-2">
        <article
          lang="de"
          className="max-h-[46vh] overflow-y-auto rounded-2xl bg-paper p-4 ring-1 ring-line sm:p-5 md:sticky md:top-4 md:max-h-[calc(100vh-6.5rem)]"
        >
          <p className="font-display text-sm tracking-widest text-primary uppercase">原文 · Person {current.n}</p>
          <p className="mt-2 text-base leading-relaxed text-ink">{current.de}</p>
          {showZh && <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-muted">{current.zh}</p>}
        </article>

        <div className="md:sticky md:top-4 md:max-h-[calc(100vh-6.5rem)] md:overflow-y-auto md:pr-1">
          <h2 className="text-sm font-semibold text-muted">选项 · 哪一句是这个人的立场？</h2>
          <ul className="mt-2 space-y-2 pb-2">
            {options.map((option) => {
              const selected = picks[current.n] === option.id;
              const owner = ownerOf(option.id);
              const taken = owner !== undefined && owner !== current.n;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => onChoose(option.id)}
                    className={`flex w-full gap-3 rounded-2xl px-3 py-3 text-left ring-1 ${
                      selected ? "bg-primary text-primary-fg ring-primary" : "bg-paper text-ink ring-line"
                    }`}
                  >
                    <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      selected ? "bg-paper text-primary" : "bg-deep text-ink"
                    }`}>
                      {option.letter}
                    </span>
                    <span className="min-w-0">
                      <span lang="de" className="block text-sm leading-relaxed sm:text-base">{option.claim}</span>
                      {showZh && (
                        <span className={`mt-1 block text-sm leading-relaxed ${selected ? "text-primary-fg" : "text-muted"}`}>
                          {option.claimZh}
                        </span>
                      )}
                      {taken && (
                        <span className={`mt-1 block text-xs font-semibold ${selected ? "text-primary-fg" : "text-accent"}`}>
                          目前标在第 {owner} 人，点这里会换过来
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            className="inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-ink disabled:opacity-40"
          >
            <ArrowLeft className="size-4" aria-hidden />
            上一位
          </button>
          <button
            type="button"
            disabled={index === active.length - 1}
            onClick={() => setIndex(index + 1)}
            className="inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-ink disabled:opacity-40"
          >
            下一位
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onFinish}
            disabled={filled < active.length}
            className="ml-auto h-11 rounded-full bg-accent px-4 text-sm font-semibold text-paper disabled:opacity-40"
          >
            {filled < active.length ? `还差 ${active.length - filled} 人` : "交卷"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Done({
  set,
  result,
  options,
  open,
  setOpen,
  showZh,
  onZh,
  onAgain,
  onWrong,
}: {
  set: ExamSet;
  result: Result;
  options: Option[];
  open: number | null;
  setOpen: (value: number | null) => void;
  showZh: boolean;
  onZh: () => void;
  onAgain: () => void;
  onWrong: () => void;
}) {
  const people = set.speakers.filter((speaker) => speaker.n in result.picks || result.wrong.includes(speaker.n) || result.full);
  const ratio = result.correct / result.total;
  const tone = ratio >= 0.85 ? "稳" : ratio >= 0.6 ? "还行，看看偏的那几位" : "先别急着刷下一套";

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">结果</p>
      <h1 className="mt-2 font-display text-5xl tabular-nums text-ink">
        {result.correct}
        <span className="text-muted">/{result.total}</span>
      </h1>
      <p className="mt-2 text-lg text-muted">{tone}。{result.full ? "这次记入最高分。" : "只更新了错题，没有覆盖整套最高分。"}</p>
      <button type="button" onClick={onZh} className="mt-3 inline-flex h-10 items-center gap-1 text-sm font-semibold text-primary">
        <Languages className="size-4" aria-hidden />
        {showZh ? "隐藏中文" : "显示中文"}
      </button>
      <ul className="mt-4 space-y-2">
        {people.map((speaker) => {
          const picked = result.picks[speaker.n];
          const ok = picked === speaker.n;
          const chosen = options.find((option) => option.id === picked);
          const expanded = open === speaker.n;
          return (
            <li key={speaker.n} className={`rounded-2xl p-4 ring-1 ${ok ? "bg-good-bg ring-good-bg" : "bg-bad-bg ring-bad-bg"}`}>
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-paper ${ok ? "bg-good" : "bg-bad"}`}>
                  {ok ? <Check className="size-4" aria-hidden /> : speaker.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">第 {speaker.n} 人 {ok ? "对了" : "没对上"}</p>
                  {!ok && chosen && (
                    <p lang="de" className="mt-1 text-sm leading-relaxed text-bad">
                      你选的：{chosen.claim}
                    </p>
                  )}
                  <p lang="de" className="mt-1 text-sm leading-relaxed text-ink">
                    {ok ? speaker.claim : `正确：${speaker.claim}`}
                  </p>
                  {showZh && <p className="mt-1 text-sm leading-relaxed text-muted">{speaker.claimZh}</p>}
                  <button
                    type="button"
                    className="mt-2 text-sm font-semibold text-primary"
                    onClick={() => setOpen(expanded ? null : speaker.n)}
                  >
                    {expanded ? "收起原文" : "看原文"}
                  </button>
                  {expanded && (
                    <div className="mt-2">
                      <p lang="de" className="text-sm leading-relaxed text-ink">{speaker.de}</p>
                      {showZh && <p className="mt-2 text-sm leading-relaxed text-muted">{speaker.zh}</p>}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={onAgain} className="h-12 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg">
          再考一次，选项重排
        </button>
        {result.wrong.length > 0 && (
          <button type="button" onClick={onWrong} className="h-12 rounded-full bg-paper px-5 text-sm font-semibold text-ink ring-1 ring-line">
            只重做这 {result.wrong.length} 道
          </button>
        )}
        <Link to="/" className="inline-flex h-12 items-center px-3 text-sm font-semibold text-muted">
          回题库
        </Link>
      </div>
    </div>
  );
}

function ReadMode({
  set,
  showZh,
  onZh,
  onBack,
}: {
  set: ExamSet;
  showZh: boolean;
  onZh: () => void;
  onBack: () => void;
}) {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">精读</p>
      <h1 className="mt-2 font-display text-4xl text-ink">{set.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">先看概括句，再展开原文。模考时不要靠这里背序号，序号换一套卷就变了。</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={onBack} className="h-10 rounded-full px-3 text-sm font-semibold text-primary">
          返回
        </button>
        <button type="button" onClick={onZh} className="h-10 rounded-full bg-paper px-3 text-sm font-semibold text-ink ring-1 ring-line">
          {showZh ? "隐藏中文" : "显示中文"}
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {set.speakers.map((speaker) => {
          const expanded = open === speaker.n;
          return (
            <li key={speaker.n} className="rounded-2xl bg-paper p-4 ring-1 ring-line">
              <button type="button" className="w-full text-left" onClick={() => setOpen(expanded ? null : speaker.n)}>
                <p className="text-xs font-semibold text-primary">第 {speaker.n} 人</p>
                <p lang="de" className="mt-1 text-base leading-relaxed text-ink">{speaker.claim}</p>
                {showZh && <p className="mt-1 text-sm leading-relaxed text-muted">{speaker.claimZh}</p>}
              </button>
              {expanded && (
                <div className="mt-3 border-t border-line pt-3">
                  <p lang="de" className="text-sm leading-relaxed text-ink">{speaker.de}</p>
                  {showZh && <p className="mt-2 text-sm leading-relaxed text-muted">{speaker.zh}</p>}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
