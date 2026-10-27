import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import type { CardSet } from "@/data";

function shuffle<T>(list: T[]): T[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function CardsView({ set }: { set: CardSet }) {
  const [order, setOrder] = useState(() => set.cards.map((_, index) => index));
  const [cursor, setCursor] = useState(0);
  const [face, setFace] = useState<"de" | "zh">("de");
  const [known, setKnown] = useState<Record<number, boolean>>({});

  const card = set.cards[order[cursor]];
  const knownCount = useMemo(() => Object.values(known).filter(Boolean).length, [known]);

  function go(next: number) {
    setCursor((next + order.length) % order.length);
    setFace("de");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-10 pt-5 sm:px-6 sm:pt-8">
      <Link to="/" className="inline-flex h-10 items-center gap-1 text-sm font-semibold text-muted">
        <ArrowLeft className="size-4" aria-hidden />
        题库
      </Link>
      <p className="mt-3 text-xs font-semibold tracking-widest text-primary uppercase">{set.group}</p>
      <h1 className="mt-2 font-display text-4xl text-ink">{set.title}</h1>
      <p className="mt-1 text-muted">{set.titleZh}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{set.note}</p>

      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-muted">
        <span className="tabular-nums">
          {cursor + 1}/{order.length}
        </span>
        <span className="tabular-nums">认下来 {knownCount}</span>
      </div>

      <button
        type="button"
        onClick={() => setFace((value) => (value === "de" ? "zh" : "de"))}
        className="mt-3 flex min-h-72 flex-col rounded-3xl bg-paper p-5 text-left ring-1 ring-line"
      >
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          {face === "de" ? "德文" : "提示"}
          {card.trap ? " · 干扰项" : ""}
          {card.usedAs ? ` · 笔记里的第 ${card.usedAs} 人` : ""}
        </span>
        <span lang={face === "de" ? "de" : "zh-Hans"} className="mt-4 font-display text-2xl leading-snug text-ink">
          {face === "de" ? card.de : card.zh || "这句笔记里没有中文。试着自己用一句话概括。"}
        </span>
        <span className="mt-auto pt-8 text-sm font-semibold text-muted">点卡片翻面</span>
      </button>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="h-12 rounded-full bg-paper text-sm font-semibold text-ink ring-1 ring-line"
          onClick={() => {
            setKnown((prev) => ({ ...prev, [order[cursor]]: false }));
            go(cursor + 1);
          }}
        >
          还没稳
        </button>
        <button
          type="button"
          className="h-12 rounded-full bg-primary text-sm font-semibold text-primary-fg"
          onClick={() => {
            setKnown((prev) => ({ ...prev, [order[cursor]]: true }));
            go(cursor + 1);
          }}
        >
          这句懂了
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button type="button" onClick={() => go(cursor - 1)} className="inline-flex h-11 items-center gap-1 text-sm font-semibold text-ink">
          <ArrowLeft className="size-4" aria-hidden />
          上一句
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1 text-sm font-semibold text-primary"
          onClick={() => {
            setOrder(shuffle(set.cards.map((_, index) => index)));
            setCursor(0);
            setFace("de");
          }}
        >
          <Shuffle className="size-4" aria-hidden />
          打乱
        </button>
        <button type="button" onClick={() => go(cursor + 1)} className="inline-flex h-11 items-center gap-1 text-sm font-semibold text-ink">
          下一句
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </main>
  );
}
