import { boardSquare, clueAnswer } from '../types';

import clueAnswersFromFlatBoard from './clueAnswersFromFlatBoard';
import reGridBoard from './reGridBoard';
import reNumberBoard from './reNumberBoard';

export default function calculateBoard(board: boardSquare[][]): [boardSquare[][], clueAnswer[][]] {

  const boardSize = board.length;

  // Update each square's word numbers based on
  // other squares across and down from it
  const flatBoardWithWordNumbers = reNumberBoard(board.flat(), boardSize);

  // Find Across and Down Clues:
  const updatedAnswers: clueAnswer[][] = clueAnswersFromFlatBoard(flatBoardWithWordNumbers);

  // Put board back into 2D array
  const reGridedBoard: boardSquare[][] = reGridBoard(flatBoardWithWordNumbers, boardSize);

  return [reGridedBoard, updatedAnswers];
}