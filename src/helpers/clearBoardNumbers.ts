import { boardSquare } from '../types';

// Clear existing down and across word numbers from a flattened board

export default function clearBoardNumbers(flatBoard: boardSquare[]): boardSquare[] {
  return flatBoard.map(square => {
    // Clear all word numbers:
    square.wordStart = [false, false];
    square.acrossWordNumber = null;
    square.downWordNumber = null;
    return square;
  })
}