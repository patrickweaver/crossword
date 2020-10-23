import { clueAnswer } from '../types';

export default function reAddClues(updatedAnswers: clueAnswer[][], clues: {[key: number]: string}[]): clueAnswer[][] {
  return updatedAnswers.map((clueOrAnserArray, coaaIndex) => {
    return clueOrAnserArray.map((ca) => {
      const answerFirstLetterNumber = ca.firstLetterSquareNumber;
      if (
        answerFirstLetterNumber !== null
        && clues[coaaIndex][answerFirstLetterNumber]
      ) {
        ca.clue = clues[coaaIndex][answerFirstLetterNumber];
      } else {
        ca.clue = "";
      }
      return ca;
    });
  });
}