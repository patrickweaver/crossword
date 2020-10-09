export interface boardSquare {
  active: boolean;
  letter: string | null;
  wordStart: boolean;
  horizontalWordNumber: number | null;
  verticalWordNumber: number | null;
  squareNumber: number;
}

export interface clueAnswer {
  clue: string;
  answer: string;
}