import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import BoardSize from './BoardSize';
import Clues from './Clues';
import ModeSelect from './ModeSelect';

// Types:
import { boardSquare, clueAnswer } from './types';

// Helpers:
import blankBoard from './helpers/blankBoard';
import blankSquare from './helpers/blankSquare';
import clueAnswersFromFlatBoard from './helpers/clueAnswersFromFlatBoard';
import nArray from './helpers/nArray';
import reGridBoard from './helpers/reGridBoard';
import reNumberBoard from './helpers/reNumberBoard';

function App() {
  const defaultBoardSize: number = 3;
  const blankBoardAndClues: [boardSquare[][], clueAnswer[][]] = calculateBoard(blankBoard(defaultBoardSize))

  // - - - - - - - - -
  // State
  // - - - - - - - - -
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [board, setBoard] = useState<boardSquare[][]>(blankBoardAndClues[0]);
  // Build clueAnswers arrays from default empty board.
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[][]>(blankBoardAndClues[1]);
  const [mode, setMode] = useState<string>('normal');

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

    setClueAnswers(updatedCAs);
    

    if (type === "answer") {
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

      const reGridedBoard: boardSquare[][] = reGridBoard(boardSquaresFlat, boardSize);
      setBoard(reGridedBoard);
    }

  }

  function updateBoardSize(newBoardSize: number): void {
    let updatedBoard: boardSquare[][] = [...board];
    if (newBoardSize < boardSize) {
      updatedBoard = board
        // remove squares from each row:
        .map((row) => row.slice(0, newBoardSize))
        // remove rows beyond board size:
        .filter((_, index) => index < newBoardSize);
    } else if (newBoardSize > boardSize) {
      const diff: number = newBoardSize - boardSize;
      const diffBlankArray: number[] = nArray(diff);
      const fullBlankArray: number[] = nArray(newBoardSize);
      // Function to build an array of squares when we know the rowIndex
      const makePaddingSquares = (rowIndex: number): boardSquare[] => {
        return diffBlankArray.map((padIndex) => {
          return blankSquare(rowIndex, boardSize + padIndex, newBoardSize);
        });
      }
      // Function to build a full row array of square when we know the rowIndex
      const makeFullRow = (rowIndex: number): boardSquare[] => {
        return fullBlankArray.map((colIndex) => blankSquare(rowIndex, colIndex, newBoardSize));
      }
      const extraRows: boardSquare[][] = diffBlankArray.map((padIndex) => {
        return makeFullRow(boardSize + padIndex);
      });
      updatedBoard = board
        // add blank squares to each row:
        .map((row, index) => row.concat(makePaddingSquares(index)))
        // add additional blank rows:
        .concat(extraRows);
    }
    setBoard(updatedBoard);
    recalculateBoard(updatedBoard);
    setBoardSize(newBoardSize);
  }

  return (
    <div className="App">
      <h1>Crossword Puzzle Editor</h1>

      <BoardSize boardSize={boardSize} updateBoardSize={updateBoardSize} />  

      <ModeSelect mode={mode} onChange={(e) => setMode(e.target.value)} />
      
      <Board
        clueAnswers={clueAnswers}
        board={board}
        boardSize={boardSize}
        updateBoard={recalculateBoard}
        mode={mode}
      />
      <Clues
        clueAnswers={clueAnswers}
        updateClueAnswer={updateClueAnswer}
      />
    </div>
  );
}

export default App;
