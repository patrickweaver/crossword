import { boardSquare} from '../types';

export default function activateAll(currentBoard: boardSquare[][]): boardSquare[][] {
  return currentBoard.map(row => row.map(square => {
    square.active = true;
    return square;
  }));
}