export interface boardSquare {
  active: boolean;
  letter: string | null;
  wordStart: boolean;
  acrossWordNumber: number | null;
  downWordNumber: number | null;
  squareNumber: number;
}

export interface clueAnswer {
  direction: ('down' | 'across');
  number: number;
  clue: string;
  answer: string;
}