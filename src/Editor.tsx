import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Editor.css';
import Board from './Board';
import BoardSize from './BoardSize';
import Clues from './Clues';
import ModeSelect from './ModeSelect';

// Types:
import { boardSquare, clueAnswer } from './types';

// Helpers:
import blankBoard from './helpers/blankBoard';
import calculateBoard from './helpers/calculateBoard';
import condenseState from './helpers/condenseState';
import onSelectSquare from './helpers/onSelectSquare';
import recalculateBoard from './helpers/recalculateBoard';
import reGridBoard from './helpers/reGridBoard';
import reSizeBoard from './helpers/reSizeBoard';
import updateAnswer from './helpers/updateAnswer';
import updateAnswersOnBoard from './helpers/updateAnswersOnBoard';

function Editor(): JSX.Element {
  const defaultBoardSize: number = 7;
  const blankBoardAndClues: [boardSquare[][], clueAnswer[][]] = calculateBoard(blankBoard(defaultBoardSize))

  // - - - - - - - - -
  // State
  // - - - - - - - - -
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [board, setBoard] = useState<boardSquare[][]>(blankBoardAndClues[0]);
  // Build clueAnswers arrays from default empty board.
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[][]>(blankBoardAndClues[1]);
  const [mode, setMode] = useState<string>('normal');
  const [urlState, setUrlState] = useState<string>("");
  const [selectedSquare, setSelectedSquare] = useState<[number, number]>([0, 0]);
  const [selectedDirection, setSelectedDirection] = useState<string>("across");
  const onSelectSquareWithSet = (rowIndex: number, colIndex: number) => onSelectSquare(selectedSquare, setSelectedSquare, selectedDirection, setSelectedDirection, rowIndex, colIndex);

  const updateClueAnswer = (type: ("clue" | "answer"), newValue: string, dirIndex: number, caIndex: number, selectionStart: number = 1): void => {
    const updatedCAs: clueAnswer[][] = [...clueAnswers];
    let uca: clueAnswer = updatedCAs[dirIndex][caIndex];
    if (type === "answer") {
      uca = updateAnswer(uca, newValue, selectionStart);
      // Board is source of truth for answers
      // send updated answer to board, then recalculate
      // updated answers will be saved from updated board
      const boardSquaresFlat = updateAnswersOnBoard(board, uca, dirIndex);
      const reGridedBoard: boardSquare[][] = reGridBoard(boardSquaresFlat, boardSize);
      recalculateBoard(reGridedBoard, clueAnswers, setBoard, setClueAnswers);
    } else {
      uca.clue = newValue;
      // Needed to save clue values
      setClueAnswers(updatedCAs);
    }
  }

  function updateBoardSize(newBoardSize: number): void {
    let updatedBoard: boardSquare[][] = reSizeBoard(board, newBoardSize, boardSize);
    setBoard(updatedBoard);
    recalculateBoard(updatedBoard, clueAnswers, setBoard, setClueAnswers);
    setBoardSize(newBoardSize);
  }

  function updateUrlState(b: boardSquare[][], ca: clueAnswer[][]): void {
    const condensedState: string = condenseState(b, ca);
    setUrlState(condensedState);
  }

  return (
    <div className="editor">
      <div className="header">
        <h1>Crossword Puzzle Editor</h1>

        <p id="state">
          <Link to={`/play#${condenseState(board, clueAnswers)}`} >
            Play this Game
          </Link>
        </p>
      </div>

      <div id="board-wrapper">
        <div id="board-container">
          <BoardSize boardSize={boardSize} updateBoardSize={updateBoardSize} />  

          <ModeSelect mode={mode} onChange={(e) => setMode(e.target.value)} />
          
          <ul>
            <li>Y: {selectedSquare[0]}</li>
            <li>X: {selectedSquare[1]}</li>
            <li>Dir: {selectedDirection}</li>
          </ul>

          <Board
            clueAnswers={clueAnswers}
            board={board}
            boardSize={boardSize}
            updateBoard={(updatedBoard) => recalculateBoard(updatedBoard, clueAnswers, setBoard, setClueAnswers)}
            mode={mode}
            selectedSquare={selectedSquare}
            onSelectSquare={onSelectSquareWithSet}
            selectedDirection={selectedDirection}
          />
        </div>
      </div>
      <div id="clues-container">
        <Clues
          clueAnswers={clueAnswers}
          updateClueAnswer={updateClueAnswer}
          mode="editor"
        />
      </div>
    </div>
  );
}

export default Editor;
