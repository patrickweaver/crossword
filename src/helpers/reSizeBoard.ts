import { boardSquare } from '../types';

import blankSquare from './blankSquare';
import nArray from './nArray';

export default function reSizeBoard(board: boardSquare[][], newBoardSize: number, boardSize: number): boardSquare[][] {
  let updatedBoard: boardSquare[][] = [...board];
  if (newBoardSize < boardSize) {
    updatedBoard = board
      // remove squares from each row:
      .map((row) => row.slice(0, newBoardSize))
      // remove rows beyond board size:
      .filter((_, index) => index < newBoardSize);
  } else if (newBoardSize > boardSize) {
    const diff: number = newBoardSize - boardSize;
    const diffBlankArray: number[] = nArray(diff);
    const fullBlankArray: number[] = nArray(newBoardSize);
    // Function to build an array of squares when we know the rowIndex
    const makePaddingSquares = (rowIndex: number): boardSquare[] => {
      return diffBlankArray.map((padIndex) => {
        return blankSquare(rowIndex, boardSize + padIndex, newBoardSize);
      });
    }
    // Function to build a full row array of square when we know the rowIndex
    const makeFullRow = (rowIndex: number): boardSquare[] => {
      return fullBlankArray.map((colIndex) => blankSquare(rowIndex, colIndex, newBoardSize));
    }
    const extraRows: boardSquare[][] = diffBlankArray.map((padIndex) => {
      return makeFullRow(boardSize + padIndex);
    });
    updatedBoard = board
      // add blank squares to each row:
      .map((row, index) => row.concat(makePaddingSquares(index)))
      // add additional blank rows:
      .concat(extraRows);
  }
  return updatedBoard;
}