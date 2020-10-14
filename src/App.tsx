import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import Clues from './Clues';

// Types:
import { boardSquare, clueAnswer } from './types';

// Helpers:
import nArray from './helpers/nArray';
import BoardSquare from './BoardSquare';

const defaultBoardSize: number = 8;
const rowCols: number[] = nArray(defaultBoardSize);

const initialBoard: boardSquare[][] = rowCols.map((rowIndex: number) => {
  return rowCols.map((colIndex: number) => {
    const bs: boardSquare = {
      active: true,
      letter: "",
      wordStart: [false, false],
      acrossWordNumber: null,
      downWordNumber: null,
      squareNumber: (rowIndex * defaultBoardSize) + colIndex,
    }
    return bs;
  });
});

function App() {

  const blankBoardAndClues: [boardSquare[][], clueAnswer[][]] = calculateBoard(initialBoard)
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [board, setBoard] = useState<boardSquare[][]>(blankBoardAndClues[0]);

  // Build clueAnswers arrays from default empty board.
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[][]>(calculateBoard(board)[1]);
  

  function calculateBoard(board: boardSquare[][]): [boardSquare[][], clueAnswer[][]] {
    
    const boardSize = board.length;
    const flatBoard = board.flat();
    let wordNumber = 1;
    const wordStartFlatBoard = flatBoard.reduce((updatedFlatBoard: boardSquare[], square: boardSquare, index: number): boardSquare[] => {
  
      // Clear all word numbers:
      square.wordStart = [false, false];
      square.acrossWordNumber = null;
      square.downWordNumber = null;
  
      if (square.active) {
        // Find across words:
        if (
          index % boardSize == 0 // First column
          || !flatBoard[index - 1].active // To the right of a black square
        ) {
          square.wordStart[0] = true;
          square.acrossWordNumber = wordNumber;
        }
        // Find down words:
        if (
          index < boardSize // First row
          || !flatBoard[index - boardSize].active // Under a black square
        ) {
          square.wordStart[1] = true;
          square.downWordNumber = wordNumber;
        }
  
        if (square.wordStart[0] || square.wordStart[1]) {
          wordNumber += 1;
        }
      
      
        // Check Across:
        if (!square.acrossWordNumber) {
          square.acrossWordNumber = updatedFlatBoard[index - 1].acrossWordNumber;
        }
        if (!square.downWordNumber) {
          square.downWordNumber = updatedFlatBoard[index - boardSize].downWordNumber;
        }
      
        
        const aboveIndex = index - boardSize
        
      
      }
      updatedFlatBoard.push(square);
      return updatedFlatBoard;
    }, []);
  
    // Find Across and Down Clues:
    const clueAnswers: clueAnswer[][] = wordStartFlatBoard.reduce((clueAnswers: clueAnswer[][], square: boardSquare, index: number): clueAnswer[][] => {

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
          answer: `${square.letter || "_"}`
        }
        clueAnswers[0].push(ca);
      } else {
        const caIndex = acrossNumbers.indexOf(square.acrossWordNumber);
        const ca = clueAnswers[0][caIndex].answer += square.letter || "_";
      }
      
      
      
      if (square.wordStart[1]) {
        const ca: clueAnswer = {
          direction: 'down',
          number: square.downWordNumber,
          clue: '',
          answer: `${square.letter || "_"}`
        }
        clueAnswers[1].push(ca);
      } else {
        const caIndex = downNumbers.indexOf(square.downWordNumber);
        const ca = clueAnswers[1][caIndex].answer += square.letter || "_";
      }
  
      return clueAnswers;
  
    }, [[], []]);
  
  
    // Put board back into 2D array
    const reGridedBoard: boardSquare[][] = reGridBoard(wordStartFlatBoard, boardSize);
  
    return [reGridedBoard, clueAnswers];
  }

  function reGridBoard(flatBoard: boardSquare[], boardSize: number): boardSquare[][] {
    return rowCols.map((rowIndex: number): boardSquare[] => {
      return rowCols.map((colIndex: number): boardSquare => {
        const index = (rowIndex * boardSize) + colIndex;
        return flatBoard[index];
      });
    });
  }

  function recalculateBoard(updatedBoard: boardSquare[][]): void {

    const [recalculatedUpdatedBoard, clueAnswers] = calculateBoard(updatedBoard);
    setBoard(recalculatedUpdatedBoard);
    setClueAnswers(clueAnswers)
  }

  const updateClueAnswer = (type: ("clue" | "answer"), newValue: string, dirIndex: number, caIndex: number): void => {
    const updatedCA: clueAnswer[][] = [...clueAnswers];
    const oldLength: number = updatedCA[dirIndex][caIndex][type].length;
    //console.log("OL:", oldLength);
    updatedCA[dirIndex][caIndex][type] = newValue;
    if (type === "answer") {
      //console.log(updatedCA[dirIndex][caIndex][type], updatedCA[dirIndex][caIndex][type].length);
      updatedCA[dirIndex][caIndex][type] = updatedCA[dirIndex][caIndex][type].slice(0, oldLength);
    }
    setClueAnswers(updatedCA);

    if (type === "answer") {
      const property: ("acrossWordNumber" | "downWordNumber") = dirIndex === 0 ? "acrossWordNumber" : "downWordNumber";
      const ca: clueAnswer = updatedCA[dirIndex][caIndex];
      let firstLetterIndex: (number | null) = null;
      const boardSquaresFlat: boardSquare[] = board.flat().map((bs: boardSquare, index: number): boardSquare => {
        const updatedBoardSquare = bs;
        if (bs[property] === ca.number) {
          if (firstLetterIndex === null) firstLetterIndex = index;
          updatedBoardSquare.letter = newValue[index - firstLetterIndex];
        }
        
        return updatedBoardSquare;
      });

      const reGridedBoard: boardSquare[][] = reGridBoard(boardSquaresFlat, boardSize);
      setBoard(reGridedBoard);
    }

  }

  return (
    <div className="App">
      <h1>Crossword Puzzle Editor</h1>
      <Board
        clueAnswers={clueAnswers}
        board={board}
        boardSize={boardSize}
        updateBoard={recalculateBoard}
      />
      <Clues
        clueAnswers={clueAnswers}
        updateClueAnswer={(updateClueAnswer)}
      />
    </div>
  );
}

export default App;
