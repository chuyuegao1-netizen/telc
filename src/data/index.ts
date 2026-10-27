import { cardSets } from "./cards";
import { examsA } from "./exams-a";
import { examsB } from "./exams-b";
import type { CardSet, ExamSet } from "./types";

export const exams: ExamSet[] = [...examsA, ...examsB];

export const cards: CardSet[] = cardSets;

export const groups = ["经典题库", "2025.07", "2026.03", "2026.05"] as const;

export function examById(id: string) {
  return exams.find((set) => set.id === id);
}

export function cardById(id: string) {
  return cards.find((set) => set.id === id);
}

export type { CardSet, ExamSet, Speaker, StudyCard } from "./types";
