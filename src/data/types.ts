export type Speaker = {
  n: number;
  de: string;
  zh: string;
  claim: string;
  claimZh: string;
};

export type ExamSet = {
  id: string;
  title: string;
  titleZh: string;
  group: "经典题库" | "2025.07" | "2026.03" | "2026.05";
  blurb: string;
  speakers: Speaker[];
};

export type StudyCard = {
  de: string;
  zh?: string;
  /** Speaker number in this paper, if the line was actually used. */
  usedAs?: number;
  trap?: boolean;
};

export type CardSet = {
  id: string;
  title: string;
  titleZh: string;
  group: ExamSet["group"];
  note: string;
  cards: StudyCard[];
};
