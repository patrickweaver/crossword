import { boardSquare } from '../types';
import blankSquare from './blankSquare';
import nArray from './nArray';


// Build a blank board of the correct size

export default function blankBoard(size: number): boardSquare[][] {
  const rowCols: number[] = nArray(size);
  return rowCols.map((rowIndex: number) => {
    return rowCols.map((colIndex: number) => {
      return blankSquare(rowIndex, colIndex, size);
    });
  });
}