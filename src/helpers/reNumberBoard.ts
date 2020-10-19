import { boardSquare, boardSquareContext, wordStart } from '../types';
import isWordStart from './isWordStart';
import clearBoardNumbers from './clearBoardNumbers';

// Update down and across word numbers based on active board squares

export default function reNumberBoard(flatBoard: boardSquare[], boardSize: number): boardSquare[] {

  const flatBoardCleared = clearBoardNumbers(flatBoard);

  let wordNumber = 1; // clueAnswers are 1 indexed

  return flatBoardCleared.reduce((updatedFlatBoard: boardSquare[], square: boardSquare, index: number, flatBoard: boardSquare[]): boardSquare[] => {

    const bsContext: boardSquareContext = { flatBoard, index, boardSize }
    const { downWordStart, acrossWordStart, eitherWordStart }: wordStart = isWordStart(bsContext);
    if (square.active) {
      let aWN: (number | null) = null, dWN: (number | null) = null;
      // Find start of words:
      if (eitherWordStart) {
        if (acrossWordStart) {
          square.wordStart[0] = true;
          aWN = wordNumber;
        }
        if (downWordStart) {
          square.wordStart[1] = true;
          dWN = wordNumber;
        }
        wordNumber += 1;
      }
      // Set wordNumbers for non start words based on previous
      square.acrossWordNumber = aWN || updatedFlatBoard[index - 1].acrossWordNumber;
      square.downWordNumber = dWN || updatedFlatBoard[index - boardSize].downWordNumber;
    }
    updatedFlatBoard.push(square);
    return updatedFlatBoard;
  }, []);
}