import { boardSquare } from '../types';

import nArray from './nArray';

// Converts a flattened board back into a 2D grid 

export default function reGridBoard(flatBoard: boardSquare[], boardSize: number): boardSquare[][] {
  const rowCols: number[] = nArray(boardSize);
  return rowCols.map((rowIndex: number): boardSquare[] => {
    return rowCols.map((colIndex: number): boardSquare => {
      const index = (rowIndex * boardSize) + colIndex;
      return flatBoard[index];
    });
  });
}