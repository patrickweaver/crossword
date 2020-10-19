import { boardSquareContext, wordStart } from '../types';

// Determine whether a square at an index of a flattened board is the start of a down word, an across word, or either

export default function isWordStart({flatBoard, index, boardSize}: boardSquareContext): wordStart {

  const firstCol = index % boardSize === 0;
  const firstRow = index < boardSize;

  // Only need to check these if the corresponding var above is false
  let rightOfBlack = false, underBlack = false;
  if (!firstCol) {
    rightOfBlack = !flatBoard[index - 1].active;
  }
  if (!firstRow) {
    underBlack = !flatBoard[index - boardSize].active;
  }

  const acrossWordStart = firstCol || rightOfBlack;
  const downWordStart = firstRow || underBlack;

  return {
    acrossWordStart: acrossWordStart,
    downWordStart: downWordStart,
    eitherWordStart: acrossWordStart || downWordStart,
  }
}