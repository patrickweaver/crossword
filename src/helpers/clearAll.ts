import { boardSquare } from '../types';

export default function clearAll(currentBoard: boardSquare[][]): boardSquare[][] {
  return currentBoard.map(row => row.map(square => {
    if (square.active) {
      square.letter = "";
    }
    return square;
  }));
}