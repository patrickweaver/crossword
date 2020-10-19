import { boardSquare } from '../types';
import nArray from './nArray';

// Build a blank board of the correct size

export default function blankBoard(size: number): boardSquare[][] {
  const rowCols: number[] = nArray(size);
  return rowCols.map((rowIndex: number) => {
    return rowCols.map((colIndex: number) => {
      const bs: boardSquare = {
        active: true,
        letter: "",
        wordStart: [false, false],
        acrossWordNumber: null,
        downWordNumber: null,
        squareNumber: (rowIndex * size) + colIndex,
      }
      return bs;
    });
  });
}