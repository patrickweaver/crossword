import { boardSquare, clueAnswer } from '../types';

import letterOrBlank from './letterOrBlank';

// Updates answers based on updated board numbers

export default function clueAnswersFromFlatBoard(flatBoardWithWordNumbers: boardSquare[]) {
  return flatBoardWithWordNumbers.reduce((clueAnswers: clueAnswer[][], square: boardSquare, index: number): clueAnswer[][] => {

    // Inactive Squares
    if (!square.acrossWordNumber || !square.downWordNumber) {
      return clueAnswers;
    }
    
    const acrossNumbers = clueAnswers[0].map(i => i.number);
    const downNumbers = clueAnswers[1].map(i => i.number);

    if (square.wordStart[0]) {
    // Find starts of words
      const ca: clueAnswer = {
        direction: 'across',
        number: square.acrossWordNumber,
        clue: '',
        answer: letterOrBlank(square.letter)
      }
      clueAnswers[0].push(ca);
    } else {
      const caIndex = acrossNumbers.indexOf(square.acrossWordNumber);
      const ca = clueAnswers[0][caIndex].answer += letterOrBlank(square.letter);
    }
    
    if (square.wordStart[1]) {
      const ca: clueAnswer = {
        direction: 'down',
        number: square.downWordNumber,
        clue: '',
        answer: letterOrBlank(square.letter)
      }
      clueAnswers[1].push(ca);
    } else {
      const caIndex = downNumbers.indexOf(square.downWordNumber);
      const ca = clueAnswers[1][caIndex].answer += letterOrBlank(square.letter);
    }

    return clueAnswers;

  }, [[], []]);
}