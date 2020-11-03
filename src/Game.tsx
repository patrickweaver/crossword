import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Board from './Board';
import Clues from './Clues';

import blankBoard from './helpers/blankBoard';
import calculateBoard from './helpers/calculateBoard';
import expandState from './helpers/expandState';
import onSelectSquare from './helpers/onSelectSquare';
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
  const [selectedSquare, setSelectedSquare] = useState<[number, number]>([0, 0]);
  const [selectedDirection, setSelectedDirection] = useState<string>("across");
  const onSelectSquareWithSet = (acrossWordNumber: number, downWordNumber: number) => onSelectSquare(selectedSquare, setSelectedSquare, selectedDirection, setSelectedDirection, acrossWordNumber, downWordNumber);

  const [checkAnswers, setCheckAnswers] = useState<boolean>(false);

  function updateCheckAnswers(event: React.ChangeEvent<HTMLInputElement>):void {
    setCheckAnswers(event.target.checked);
  }

  let game;
  if (window.location.hash) {
    game = (
      <div>

      <p id="description">This is a crossword puzzle created in this app. The clues and correct answers are encoded in the URL, which is why it is so long. Toggle the checkbox below the board to autocheck your answers.</p>

        <div id="sections">
          <div id="board-container">
            <Board
              clueAnswers={clueAnswers}
              board={board}
              correctBoard={hashBoard}
              boardSize={board.length}
              updateBoard={(updatedBoard) => recalculateBoard(updatedBoard, clueAnswers, setBoard, setClueAnswers)}
              mode={"game"}
              selectedSquare={selectedSquare}
              onSelectSquare={onSelectSquareWithSet}
              selectedDirection={selectedDirection}
              checkAnswers={checkAnswers}
            />
            <div id="check-answers-toggle">
              <label>Check answers:</label>
              <input type="checkbox" onChange={updateCheckAnswers} />
            </div>
          </div>
          <div id="clues-container">
            <Clues
              clueAnswers={clueAnswers}
              mode="game"
            />
          </div>
        </div>
      </div>
    )
  } else {
    game = (
      <div>
        <h2>Invalid Game Link</h2>
        <p>This link does not correspond to a crossword. <Link to={`${process.env.PUBLIC_URL}/editor`}>Try making your own here.</Link></p>
      </div>
    )
  }


  return (
    <div id="game">
      <p><Link to={`${process.env.PUBLIC_URL}/editor`}>Make your own crossword here.</Link></p>
      <h1>Crossword Puzzle Game</h1>

      {game}
    </div>
  )
}