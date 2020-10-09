import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import Clues from './Clues';

// Types:
import { boardSquare, clueAnswer } from './types';

// Helpers:
import nArray from './helpers/nArray';

const defaultBoardSize: number = 8;
const rowCols: number[] = nArray(defaultBoardSize);

const defaultClueAnswerArray: clueAnswer[] = nBlankClueAnswers((defaultBoardSize * 2) - 1); 

function nBlankClueAnswers(n: number): clueAnswer[] {
  const nClueAnswers: clueAnswer[] = nArray(n).map((i: number): clueAnswer => {
    return (
      {
        clue: "",
        answer: ""
      }
    )
  });
  return nClueAnswers;
}



const initialBoard: boardSquare[][] = rowCols.map((rowIndex: number) => {
  return rowCols.map((colIndex: number) => {
    const bs: boardSquare = {
      active: true,
      letter: " ",
      wordStart: false,
      horizontalWordNumber: null,
      verticalWordNumber: null,
      squareNumber: (rowIndex * defaultBoardSize) + colIndex,
    }
    return bs;
  });
});

function App() {

  const blankBoardAndClues: [boardSquare[][], number] = calculateBoard(initialBoard)
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[]>(defaultClueAnswerArray);
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [board, setBoard] = useState<boardSquare[][]>(blankBoardAndClues[0]);
  

  function calculateBoard(board: boardSquare[][]): [boardSquare[][], number] {
    
    const boardSize = board.length;
    const flatBoard = board.flat();
    let wordNumber = 1;
    const wordStartFlatBoard = flatBoard.map((square: boardSquare, index: number): boardSquare => {

      // Clear all word numbers:
      square.wordStart = false;
      square.horizontalWordNumber = null;
      square.verticalWordNumber = null;
      
      if (square.active) {
        // Find horizontal words:
        if (
          index % boardSize == 0 // First column
          || !flatBoard[index - 1].active // To the right of a black square
        ) {
          console.log("set H:", wordNumber)
          square.wordStart = true;
          square.horizontalWordNumber = wordNumber;
          console.log("H", wordNumber, index);
        }
        // Find vertical words:
        if (
          index < boardSize // First row
          || !flatBoard[index - boardSize].active // Under a black square
        ) {
          square.wordStart = true;
          square.verticalWordNumber = wordNumber;
          console.log("V", wordNumber, index);
        }
        
        if (square.wordStart) {
          wordNumber += 1;
        }
      }
      return square;
    });

    // Put board back into 2D array
    const reGridBoard: boardSquare[][] = rowCols.map((rowIndex: number): boardSquare[] => {
      return rowCols.map((colIndex: number): boardSquare => {
        const index = (rowIndex * boardSize) + colIndex;
        return wordStartFlatBoard[index];
      });
    });

    // Update number of clues:
    const numberOfClues: number = wordNumber - 1

    return [reGridBoard, numberOfClues];
  }

  function recalculateBoard(updatedBoard: boardSquare[][]): void {

    const [recalculatedUpdatedBoard, numberOfClueAnswers] = calculateBoard(updatedBoard);
    setBoard(recalculatedUpdatedBoard);
    setClueAnswers(nBlankClueAnswers(numberOfClueAnswers))
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
