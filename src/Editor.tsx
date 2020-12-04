import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//import * as words from 'an-array-of-english-words';


import './Editor.css';
import Board from './Board';
import BoardSize from './BoardSize';
import Clues from './Clues';
import ModeSelect from './ModeSelect';

// Types:
import { boardSquare, clueAnswer } from './types';

// Helpers:
import activateAll from './helpers/activateAll';
import blankBoard from './helpers/blankBoard';
import calculateBoard from './helpers/calculateBoard';
import clearAll from './helpers/clearAll';
import condenseState from './helpers/condenseState';
import onSelectSquare from './helpers/onSelectSquare';
import reCalculateBoard from './helpers/reCalculateBoard';
import reGridBoard from './helpers/reGridBoard';
import reSizeBoard from './helpers/reSizeBoard';
import updateAnswer from './helpers/updateAnswer';
import updateAnswersOnBoard from './helpers/updateAnswersOnBoard';

// Put this into a config at some point
const HOST = "https://doodles.patrickweaver.net";

const defaultBoardSize: number = 5;
const blankBoardAndClues: [boardSquare[][], clueAnswer[][]] = calculateBoard(blankBoard(defaultBoardSize))

function Editor(): JSX.Element {

  // - - - - - - - - -
  // State
  // - - - - - - - - -
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [board, setBoard] = useState<boardSquare[][]>(blankBoardAndClues[0]);
  // Build clueAnswers arrays from default empty board.
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[][]>(blankBoardAndClues[1]);
  const reCalculateBoardWithSet = (updatedBoard: boardSquare[][], updatedClueAnswers: clueAnswer[][]) => reCalculateBoard(updatedBoard, updatedClueAnswers, setBoard, setClueAnswers);
  const [mode, setMode] = useState<string>('normal');
  const [selectedSquare, setSelectedSquare] = useState<[number, number]>([1, 1]);
  const [selectedDirection, setSelectedDirection] = useState<string>("none");
  const onSelectSquareWithSet = (acrossWordNumber: number, downWordNumber: number, updateDirection: boolean) => onSelectSquare(selectedSquare, setSelectedSquare, selectedDirection, setSelectedDirection, acrossWordNumber, downWordNumber, updateDirection);

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
      reCalculateBoardWithSet(reGridedBoard, clueAnswers);
    } else {
      uca.clue = newValue;
      // Needed to save clue values
      setClueAnswers(updatedCAs);
    }
  }

  function updateBoardSize(newBoardSize: number): void {
    let updatedBoard: boardSquare[][] = reSizeBoard(board, newBoardSize, boardSize);
    setBoard(updatedBoard);
    reCalculateBoardWithSet(updatedBoard, clueAnswers);
    setBoardSize(newBoardSize);
  }

  function copyLinkToGame(event: React.MouseEvent<HTMLButtonElement>) {
    const gameLink: (HTMLElement | null) = document.getElementById("game-link");
    if (!gameLink) return ;
    const gameLinkInput = gameLink as HTMLInputElement
    gameLinkInput.select();
    document.execCommand('copy');
  }

  return (
    <div className="editor">
      <div className="header">
        <h1>Crossword Puzzle Composer</h1>

        <p id="description">This is a composer for creating crossword puzzles. Answer updates will display both on the board and next to the clues below. Double click on a square to toggle it on or off.</p>

        <ul id="state">
          <li>
            <Link to={`${process.env.PUBLIC_URL}/play#${condenseState(board, clueAnswers)}`} >
              Play This Game
            </Link>
          </li>
          <li>
            <button onClick={copyLinkToGame}>Copy Link to This Game</button>
          </li>
          <li>
            <input type="text" id="game-link" readOnly value={`${HOST}${process.env.PUBLIC_URL}/play/#${condenseState(board, clueAnswers)}`} />
          </li>

          <p>The clues and answers are encoded in a very long URL hash, every puzzle URL is unique!</p>

        </ul>
      </div>

      <div id="sections">
        <div id="board-container">
          <BoardSize boardSize={boardSize} updateBoardSize={updateBoardSize} />  

          <ModeSelect mode={mode} onChange={(e) => setMode(e.target.value)} />

          <Board
            clueAnswers={clueAnswers}
            board={board}
            boardSize={boardSize}
            updateBoard={(updatedBoard) => reCalculateBoardWithSet(updatedBoard, clueAnswers)}
            mode={mode}
            selectedSquare={selectedSquare}
            onSelectSquare={onSelectSquareWithSet}
            selectedDirection={selectedDirection}
            setSelectedDirection={(direction: string) => {
              console.log("D:", direction);
              setSelectedDirection(direction);
            }}
            checkAnswers={false}
          />

          <div className="button-section">
            <button onClick={() => reCalculateBoardWithSet(activateAll(board), clueAnswers)}>Activate All</button>
            <button onClick={() => reCalculateBoardWithSet(clearAll(board), clueAnswers)}>Clear All</button>
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
    </div>
  );
}

export default Editor;
