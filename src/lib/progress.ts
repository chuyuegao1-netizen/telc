export type SetProgress = {
  best: number;
  total: number;
  attempts: number;
  last: number;
  wrong: number[];
};

const KEY = "hoerraum-progress-v1";

function read(): Record<string, SetProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, SetProgress>) : {};
  } catch {
    return {};
  }
}

function write(data: Record<string, SetProgress>) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadProgress(): Record<string, SetProgress> {
  return read();
}

export function saveFullAttempt(setId: string, correct: number, total: number, wrong: number[]) {
  const all = read();
  const prev = all[setId];
  all[setId] = {
    best: Math.max(prev?.best ?? 0, correct),
    total,
    attempts: (prev?.attempts ?? 0) + 1,
    last: correct,
    wrong,
  };
  write(all);
  return all[setId];
}

/** Update the wrong-list after a partial redo. Does not change the best score. */
export function patchWrong(setId: string, practiced: number[], stillWrong: number[]) {
  const all = read();
  const prev = all[setId];
  if (!prev) return;
  const next = new Set(prev.wrong);
  const still = new Set(stillWrong);
  for (const n of practiced) {
    if (still.has(n)) next.add(n);
    else next.delete(n);
  }
  all[setId] = { ...prev, wrong: [...next].sort((a, b) => a - b) };
  write(all);
}

export function clearProgress() {
  localStorage.removeItem(KEY);
}
