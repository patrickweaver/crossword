import { boardSquare, clueAnswer } from '../types';

import letterOrBlank from './letterOrBlank';

var words = require('an-array-of-english-words');

// Updates answers based on updated board numbers

export default function clueAnswersFromFlatBoard(flatBoardWithWordNumbers: boardSquare[]): clueAnswer[][] {
  const clueAnswersWithoutPossibleAnswers = flatBoardWithWordNumbers.reduce((clueAnswers: clueAnswer[][], square: boardSquare, index: number): clueAnswer[][] => {

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
        answer: letterOrBlank(square.letter),
        firstLetterSquareNumber: index,
        possibleAnswers: [],
      }
      clueAnswers[0].push(ca);
    } else {
      const caIndex = acrossNumbers.indexOf(square.acrossWordNumber);
      clueAnswers[0][caIndex].answer += letterOrBlank(square.letter);
    }
    
    if (square.wordStart[1]) {
      const ca: clueAnswer = {
        direction: 'down',
        number: square.downWordNumber,
        clue: '',
        answer: letterOrBlank(square.letter),
        firstLetterSquareNumber: index,
        possibleAnswers: [],
      }
      clueAnswers[1].push(ca);
    } else {
      const caIndex = downNumbers.indexOf(square.downWordNumber);
      clueAnswers[1][caIndex].answer += letterOrBlank(square.letter);
    }

    return clueAnswers;

  }, [[], []]);

  

  // Calculate possible answers from current answers:

  const clueAnswersWithPossibleAnswers = clueAnswersWithoutPossibleAnswers.map((caArray: clueAnswer[], i1: number): clueAnswer[] => {
    return caArray.map((ca: clueAnswer, i2: number): clueAnswer => {

      let setLetters = 0;

      // Create regex for answer:
      let r = "^";
      for (let i = 0; i < ca.answer.length; i++) {
        const char = ca.answer[i];
        if (char === " ") {
          r += ".";
        } else {
          r += char.toLowerCase();
          setLetters += 1;
        }
      }
      r += "$"
      
      if (setLetters > 2 || ca.answer.length < 4) {
        // Set potential answers to words:
        ca.possibleAnswers = words.filter((d: any) => (new RegExp(r)).test(d))
      } else {
        ca.possibleAnswers = null;
      }
      

      return ca;
    })
  })

  return clueAnswersWithPossibleAnswers;
}