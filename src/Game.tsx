import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Board from './Board';
import Clues from './Clues';

import blankBoard from './helpers/blankBoard';
import calculateBoard from './helpers/calculateBoard';
import expandState from './helpers/expandState';
import recalculateBoard from './helpers/recalculateBoard';

import './Game.css';

import { boardSquare, clueAnswer } from './types';

export default function Game(): JSX.Element {

  const hash = window.location.hash
  const hashTrimmed = hash.slice(1, hash.length);
  const [hashBoard, hashClueAnswers] = expandState(hashTrimmed)
  
  const blankBoardAndClues: [boardSquare[][], clueAnswer[][]] = calculateBoard(blankBoard(hashBoard.length))

  const [board, setBoard] = useState<boardSquare[][]>(blankBoardAndClues[0]);
  // Build clueAnswers arrays from default empty board.
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[][]>(hashClueAnswers);

  let game;
  if (window.location.hash) {
    game = (
      <div>
        <Board
          clueAnswers={clueAnswers}
          board={board}
          correctBoard={hashBoard}
          boardSize={board.length}
          updateBoard={(updatedBoard) => recalculateBoard(updatedBoard, clueAnswers, setBoard, setClueAnswers)}
          mode={"game"}
        />
        <Clues
          clueAnswers={clueAnswers}
          mode="game"
        />
      </div>
    )
  } else {
    game = (
      <div>
        <h2>Invalid Game Link</h2>
        <p>This link does not correspond to a crossword. <Link to="/editor">Try making your own here.</Link></p>
      </div>
    )
  }


  return (
    <div id="game">
      <p><Link to="/editor">Make your own crossword here.</Link></p>
      <h1>Crossword Puzzle Game</h1>

      {game}
    </div>
  )
}