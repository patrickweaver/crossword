import { boardSquare, clueAnswer } from '../types';

export default function expandState(b64State: string): [boardSquare[][], clueAnswer[][]] {

  let condBoard: (string | number | null)[][][];
  let condCA: (string | number | null)[][][];
  try {

    let i = 0;
    let hyphensRemovedString = ""
    while (i < b64State.length) {
      if (i > 0 && (i + 1) % 64 === 0) {
        // Skip this character
        if (b64State[i] !== "-") {
          throw `Invlaid puzzle state string, i: ${i}, c: ${b64State[i]}`;
        }
      } else {
        hyphensRemovedString += b64State[i];
      }
      i++;
    }

    const jsonString = atob(hyphensRemovedString);
    const expandedState = JSON.parse(atob(hyphensRemovedString));
    [condBoard, condCA] = expandedState.state;
  } catch (error) {
    console.log(error);
    return [[[]], [[]]];
  }

  function expWordStart(condWordStart: string): [boolean, boolean] {
    const [a, b] = condWordStart.split("");
    const aBool = a === 't';
    const bBool = b === 't';
    return [aBool, bBool];
  }


  const board: boardSquare[][] = condBoard.map((a: (string | number | null)[][]) => a.map(bs => {

    const active = bs[0] === 't';
    const letter = bs[1] as string;
    const wordStart = expWordStart(bs[2] as string);
    const acrossWordNumber = parseInt(bs[3] as string);
    const downWordNumber = parseInt(bs[4] as string);
    const squareNumber = parseInt(bs[5] as string);

    return {
      active,
      letter,
      wordStart,
      acrossWordNumber,
      downWordNumber,
      squareNumber
    }
  }));

  const clueAnswers: clueAnswer[][] = condCA.map((dir: (string | number | null)[][]) => dir.map(ca => {

    const direction = ca[0] === 'd' ? 'down' : 'across';
    const number = parseInt(ca[1] as string);
    const clue = ca[2] as string;
    const answer = ca[3] as string;
    const firstLetterSquareNumber = parseInt(ca[4] as string);
    const possibleAnswers: string[] = [];

    return {
      direction,
      number,
      clue,
      answer,
      firstLetterSquareNumber,
      possibleAnswers,
    }
  }));
  
  return [board, clueAnswers];
}