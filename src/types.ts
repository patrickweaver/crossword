export interface boardSquare {
  active: boolean;
  letter: string | null;
  wordStart: boolean;
  horizontalWordNumber: number | null;
  verticalWordNumber: number | null;
}

export interface clueAnswer {
  clue: string;
  answer: string;
}