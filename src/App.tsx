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
      letter: " ",
      wordStart: false,
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
    const wordStartFlatBoard = flatBoard.map((square: boardSquare, index: number): boardSquare => {

      // Clear all word numbers:
      square.wordStart = false;
      square.acrossWordNumber = null;
      square.downWordNumber = null;
      
      if (square.active) {
        // Find across words:
        if (
          index % boardSize == 0 // First column
          || !flatBoard[index - 1].active // To the right of a black square
        ) {
          square.wordStart = true;
          square.acrossWordNumber = wordNumber;
        }
        // Find down words:
        if (
          index < boardSize // First row
          || !flatBoard[index - boardSize].active // Under a black square
        ) {
          square.wordStart = true;
          square.downWordNumber = wordNumber;
        }
        
        if (square.wordStart) {
          wordNumber += 1;
        }
      }
      return square;
    });

    // Find Across and Down Clues:
    const clueAnswers: clueAnswer[][] = wordStartFlatBoard.reduce((clueAnswers: clueAnswer[][], square: boardSquare, index: number): clueAnswer[][] => {

      if (square.wordStart) {
        if (square.acrossWordNumber) {
          const ca: clueAnswer = {
            direction: 'across',
            number: square.acrossWordNumber,
            clue: '',
            answer: `${square.letter}`
          }
          clueAnswers[0].push(ca);
        }
        if (square.downWordNumber) {
          const ca: clueAnswer = {
            direction: 'down',
            number: square.downWordNumber,
            clue: '',
            answer: `${square.letter}`
          }
          clueAnswers[1].push(ca);
        }
      }

      return clueAnswers;

    }, [[], []]);


    // Put board back into 2D array
    const reGridBoard: boardSquare[][] = rowCols.map((rowIndex: number): boardSquare[] => {
      return rowCols.map((colIndex: number): boardSquare => {
        const index = (rowIndex * boardSize) + colIndex;
        return wordStartFlatBoard[index];
      });
    });

    return [reGridBoard, clueAnswers];
  }

  function updateClueAnswers(prevClueAnswers: clueAnswer[]): clueAnswer[] {



    return prevClueAnswers;
  }

  function recalculateBoard(updatedBoard: boardSquare[][]): void {

    const [recalculatedUpdatedBoard, clueAnswers] = calculateBoard(updatedBoard);
    setBoard(recalculatedUpdatedBoard);
    setClueAnswers(clueAnswers)
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
      <Clues clueAnswers={clueAnswers} setClueAnswers={setClueAnswers} />
    </div>
  );
}

export default App;
