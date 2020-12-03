import { boardSquare, clueAnswer } from '../types';

import calculateBoard from './calculateBoard';
import extractClues from './extractClues';
import reAddClues from './reAddClues';

export default function reCalculateBoard(
  updatedBoard: boardSquare[][],
  clueAnswers: clueAnswer[][],
  setBoard: (updatedBoard: boardSquare[][]) => void,
  setClueAnswers: (updatedClueAnswers: clueAnswer[][]) => void,
): void {
  // Save clue values:
  const clues: {[key: number]: string}[] = extractClues(clueAnswers);
  // Update clueAnswer numbers:
  const [recalculatedUpdatedBoard, updatedAnswers] = calculateBoard(updatedBoard);
  // Re-add clue values:
  const updatedClueAnswers: clueAnswer[][] = reAddClues(updatedAnswers, clues)
  setBoard(recalculatedUpdatedBoard);
  setClueAnswers(updatedClueAnswers);
}