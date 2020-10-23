import { clueAnswer } from '../types';

export default function extractClues(clueAnswers: clueAnswer[][]): {[key: number]: string}[] {
  return clueAnswers.map(ar => {
    return ar.reduce((a, c) => {
      const index: (number | null) = c.firstLetterSquareNumber
      if (index != null) {
        a[index] = c.clue;
      }
      return a;
    }, {} as {[key: number]: string});
  })
}