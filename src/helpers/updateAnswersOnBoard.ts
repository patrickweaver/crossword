import { boardSquare, clueAnswer } from '../types';

export default function updateAnswersOnBoard(board: boardSquare[][], uca: clueAnswer, dirIndex: number) {
  // store kind of answer in property
  const property: ("acrossWordNumber" | "downWordNumber") = dirIndex === 0 ? "acrossWordNumber" : "downWordNumber";

  // Store new answer in flattened boardSquares array:
  let answerIndex = 0;
  const boardSquaresFlat: boardSquare[] = board
    .flat()
    .map((bs: boardSquare, index: number): boardSquare => {
      const updatedBoardSquare = bs;
      // Update board square with new value
      if (bs[property] === uca.number) {
        updatedBoardSquare.letter = uca.answer[answerIndex];
        answerIndex += 1;
      }
    return updatedBoardSquare;
  });
  return boardSquaresFlat;
}