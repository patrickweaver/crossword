import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import Clues from './Clues';

// Types:
import { boardSquare, clueAnswer } from './types';

// Helpers:
import blankBoard from './helpers/blankBoard';
import clueAnswersFromFlatBoard from './helpers/clueAnswersFromFlatBoard';
import reGridBoard from './helpers/reGridBoard';
import reNumberBoard from './helpers/reNumberBoard';

function App() {
  const defaultBoardSize: number = 8;
  const blankBoardAndClues: [boardSquare[][], clueAnswer[][]] = calculateBoard(blankBoard(defaultBoardSize))

  // - - - - - - - - -
  // State
  // - - - - - - - - -
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [board, setBoard] = useState<boardSquare[][]>(blankBoardAndClues[0]);
  // Build clueAnswers arrays from default empty board.
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[][]>(blankBoardAndClues[1]);

  function calculateBoard(board: boardSquare[][]): [boardSquare[][], clueAnswer[][]] {

    const boardSize = board.length;

    // Update each square's word numbers based on
    // other squares across and down from it
    const flatBoardWithWordNumbers = reNumberBoard(board.flat(), boardSize);
  
    // Find Across and Down Clues:
    const updatedClueAnswers: clueAnswer[][] = clueAnswersFromFlatBoard(flatBoardWithWordNumbers);
  
    // Put board back into 2D array
    const reGridedBoard: boardSquare[][] = reGridBoard(flatBoardWithWordNumbers, boardSize);
  
    return [reGridedBoard, updatedClueAnswers];
  }

  function recalculateBoard(updatedBoard: boardSquare[][]): void {

    const [recalculatedUpdatedBoard, clueAnswers] = calculateBoard(updatedBoard);
    setBoard(recalculatedUpdatedBoard);
    setClueAnswers(clueAnswers)
  }

  const updateClueAnswer = (type: ("clue" | "answer"), newValue: string, dirIndex: number, caIndex: number, selectionStart?: number): void => {
    const updatedCAs: clueAnswer[][] = [...clueAnswers];
    const uca: clueAnswer = updatedCAs[dirIndex][caIndex];
    
    let editIndex = selectionStart || 1;
    if (type === "answer") {
      
      const oldLength: number = uca.answer.length;
      if (newValue.length < oldLength) {
      const filler = " ".repeat(oldLength - newValue.length);
      // Deleted characters: 
        uca.answer = (newValue.slice(0, editIndex) + filler + newValue.slice(editIndex, newValue.length));
      } else {
      // Added characteres:
      // Remove character after cursor and trim
      // to the correct length
        uca.answer = (newValue.slice(0, editIndex) + newValue.slice(editIndex + 1, newValue.length)).slice(0, oldLength);
      }
    } else {
      uca.clue = newValue;
    }
    console.log(`|${uca.answer}|`);
    console.log(updatedCAs);

    setClueAnswers(updatedCAs);
    

    if (type === "answer") {
      const property: ("acrossWordNumber" | "downWordNumber") = dirIndex === 0 ? "acrossWordNumber" : "downWordNumber";
      let firstLetterIndex: (number | null) = null;
      const boardSquaresFlat: boardSquare[] = board.flat().map((bs: boardSquare, index: number): boardSquare => {
        const updatedBoardSquare = bs;
        // Update board square with new value
        if (bs[property] === uca.number) {
          if (firstLetterIndex === null) firstLetterIndex = index;
          updatedBoardSquare.letter = uca.answer[index - firstLetterIndex];
        }
        
        return updatedBoardSquare;
      });

      const reGridedBoard: boardSquare[][] = reGridBoard(boardSquaresFlat, boardSize);
      setBoard(reGridedBoard);
    }

  }

  function updateBoardSize(event: React.ChangeEvent<HTMLInputElement>): void {
    const newBoardSize: number = parseInt(event.target.value);
    if (newBoardSize < boardSize) {
      const updatedBoard = board.map((i, index) => {

      });
    } else if (newBoardSize > boardSize) {

    }
    setBoardSize(newBoardSize);
  }

  return (
    <div className="App">
      <h1>Crossword Puzzle Editor</h1>
      <div id="board-size">
        <label>Board Size:</label>
        <input value={boardSize} onChange={updateBoardSize} />
      </div>
      <Board
        clueAnswers={clueAnswers}
        board={board}
        boardSize={boardSize}
        updateBoard={recalculateBoard}
      />
      <Clues
        clueAnswers={clueAnswers}
        updateClueAnswer={updateClueAnswer}
      />
    </div>
  );
}

export default App;
