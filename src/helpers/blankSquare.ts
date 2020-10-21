import { boardSquare } from '../types';

export default function blankSquare(rowIndex: number, colIndex: number, size: number): boardSquare {
  const bs: boardSquare = {
    active: true,
    letter: "",
    wordStart: [false, false],
    acrossWordNumber: null,
    downWordNumber: null,
    squareNumber: (rowIndex * size) + colIndex,
  }
  return bs;
}