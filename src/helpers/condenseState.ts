import { boardSquare, clueAnswer } from '../types';

export default function condenseState(board: boardSquare[][], clueAnswers: clueAnswer[][]): string {
  function condWordStart(wordStart: [boolean, boolean]): string {
    const [a, b] = wordStart;
    const aStr = a ? 't' : 'f';
    const bStr = b ? 't' : 'f';
    return aStr + bStr;
  }


  const condBoard: (string | number | null)[][][] = board.map(a => a.map(bs => {
    return [
      bs.active ? 't' : 'f',
      bs.letter,
      condWordStart(bs.wordStart),
      bs.acrossWordNumber,
      bs.downWordNumber,
      bs.squareNumber
    ]
  }));
  const condCA: (string | number | null)[][][] = clueAnswers.map(dir => dir.map(ca => {
    return [
      ca.direction === 'down' ? 'd' : 'a',
      ca.number,
      ca.clue,
      ca.answer,
      ca.firstLetterSquareNumber
    ]
  }));
  const miniJson = JSON.stringify([condBoard, condCA]);
  const btoaString = btoa(miniJson);

  let i = 0;
  let hyphenedString = "";
  while (i < btoaString.length) {
    if (i > 0 && i % 5 === 0) {
      hyphenedString += "-";
    }
    hyphenedString += btoaString[i];
    i++;
  }

  return hyphenedString
}