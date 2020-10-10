import React from 'react';
import './BoardSquare.css';

// Types:
import { boardSquare } from './types';

export interface boardSquareProps {
  rowIndex: number,
  colIndex: number,
  square: boardSquare,
  boardSize: number,
  setBoardSquare: (
    updatedBoardSquare: boardSquare,
  ) => void
}

function BoardSquare(props: boardSquareProps): JSX.Element {

  function updateSquare(event: React.MouseEvent<HTMLDivElement>): void {
    console.log(event);
    const updatedSquare = props.square;
    updatedSquare.active = !updatedSquare.active;
    props.setBoardSquare(updatedSquare);
  }

  function addLetter(event: React.ChangeEvent<HTMLInputElement>): void {
    const updatedSquare = props.square;
    updatedSquare.letter = event.target.value;
    props.setBoardSquare(updatedSquare);
  }

  const square =
    <div
      className={`board-square ${props.square.active ? '' : 'inactive'}`}
      onClick={updateSquare}
    >
      <div className="clue-number">
        {`${props.square.wordStart ? (props.square.horizontalWordNumber ? props.square.horizontalWordNumber : props.square.verticalWordNumber) : ''}`}
      </div>
      <div className="letter">
        <input
          type="text"
          value={props.square.letter || ''}
          onChange={addLetter}
        />
      </div>
    </div>
  
  return square;
}

export default BoardSquare;