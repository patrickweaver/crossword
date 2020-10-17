import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import Clues from './Clues';

// Types:
import { boardSquare, clueAnswer } from './types';

// Helpers:
import blankBoard from './helpers/blankBoard';
import clearBoardNumbers from './helpers/clearBoardNumbers';
import letterOrBlank from './helpers/letterOrBlank';
import nArray from './helpers/nArray';
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
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[][]>(calculateBoard(board)[1]);

  function calculateBoard(board: boardSquare[][]): [boardSquare[][], clueAnswer[][]] {

    const boardSize = board.length;
    const flatBoard = board.flat();

    const flatBoardCleared = clearBoardNumbers(flatBoard);

    // Update each square based on other squares across and down from it
    const wordStartFlatBoard = reNumberBoard(flatBoardCleared, boardSize);
  
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
  
  
    // Put board back into 2D array
    const reGridedBoard: boardSquare[][] = reGridBoard(wordStartFlatBoard, boardSize);
  
    return [reGridedBoard, clueAnswers];
  }

  function reGridBoard(flatBoard: boardSquare[], boardSize: number): boardSquare[][] {
    const rowCols: number[] = nArray(boardSize);
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
