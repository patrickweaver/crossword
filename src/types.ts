export interface boardSquare {
  active: boolean;
  letter: string | null;
  wordStart: [boolean, boolean];
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

export interface clueAnswerUpdate {
  clueAnswers: clueAnswer;
  dirIndex: number;
  caIndex: number;
}

export interface boardSquareContext {
  flatBoard: boardSquare[];
  index: number;
  boardSize: number;
}

export interface wordStart {
  acrossWordStart: boolean;
  downWordStart: boolean;
  eitherWordStart: boolean;
}