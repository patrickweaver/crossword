import { boardSquare, clueAnswer } from '../types';

export default function expandState(b64State: string): [boardSquare[][], clueAnswer[][]] {

  const [condBoard, condCA] = JSON.parse(atob(b64State));

  function expWordStart(condWordStart: string): [boolean, boolean] {
    const [a, b] = condWordStart.split("");
    const aBool = a === 't';
    const bBool = b === 't';
    return [aBool, bBool];
  }

  const board: boardSquare[][] = condBoard.map((a: string[]) => a.map(bs => {

    const active = bs[0] === 't';
    const letter = bs[1];
    const wordStart = expWordStart(bs[2]);
    const acrossWordNumber = bs[3];
    const downWordNumber = bs[4];
    const squareNumber = bs[5];

    return {
      active,
      letter,
      wordStart,
      acrossWordNumber,
      downWordNumber,
      squareNumber
    }
  }));
  const clueAnswers: clueAnswer[][] = condCA.map((dir: string[]) => dir.map(ca => {

    const direction = ca[0] === 'd' ? 'down' : 'across';
    const number = ca[1];
    const clue = ca[2];
    const answer = ca[3];
    const firstLetterSquareNumber = ca[4];

    return {
      direction,
      number,
      clue,
      answer,
      firstLetterSquareNumber
    }
  }));
  
  return [board, clueAnswers];
}