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
import clueAnswersFromFlatBoard from './helpers/clueAnswersFromFlatBoard';
import extractClues from './helpers/extractClues';
import reAddClues from './helpers/reAddClues';
import reGridBoard from './helpers/reGridBoard';
import reNumberBoard from './helpers/reNumberBoard';
import reSizeBoard from './helpers/reSizeBoard';
import updateAnswer from './helpers/updateAnswer';
import updateAnswersOnBoard from './helpers/updateAnswersOnBoard';

function App() {
  const defaultBoardSize: number = 9;
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
    const updatedAnswers: clueAnswer[][] = clueAnswersFromFlatBoard(flatBoardWithWordNumbers);
  
    // Put board back into 2D array
    const reGridedBoard: boardSquare[][] = reGridBoard(flatBoardWithWordNumbers, boardSize);
  
    return [reGridedBoard, updatedAnswers];
  }

  function recalculateBoard(updatedBoard: boardSquare[][]): void {
    // Save clue values:
    const clues: {[key: number]: string}[] = extractClues(clueAnswers);
    // Update clueAnswer numbers:
    const [recalculatedUpdatedBoard, updatedAnswers] = calculateBoard(updatedBoard);
    // Re-add clue values:
    const updatedClueAnswers: clueAnswer[][] = reAddClues(updatedAnswers, clues)
    setBoard(recalculatedUpdatedBoard);
    setClueAnswers(updatedClueAnswers)
  }

  const updateClueAnswer = (type: ("clue" | "answer"), newValue: string, dirIndex: number, caIndex: number, selectionStart: number = 1): void => {
    const updatedCAs: clueAnswer[][] = [...clueAnswers];
    let uca: clueAnswer = updatedCAs[dirIndex][caIndex];
    if (type === "answer") {
      uca = updateAnswer(uca, newValue, selectionStart);
    } else {
      uca.clue = newValue;
    } 

    // Needed to save clue values
    setClueAnswers(updatedCAs);

    if (type === "answer") {
      
      const boardSquaresFlat = updateAnswersOnBoard(board, uca, dirIndex);

      const reGridedBoard: boardSquare[][] = reGridBoard(boardSquaresFlat, boardSize);
      recalculateBoard(reGridedBoard);
    }

  }

  function updateBoardSize(newBoardSize: number): void {
    let updatedBoard: boardSquare[][] = reSizeBoard(board, newBoardSize, boardSize);
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
