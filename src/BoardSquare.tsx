import React from 'react';
import './BoardSquare.css';

interface boardSquare {
  active: boolean;
  letter: string | null;
  wordStart: number | null;
  horizontalWordNumber: number | null;
  verticalWordNumber: number | null;
}

export interface boardSquareProps {
  rowIndex: number,
  colIndex: number,
  square: boardSquare,
  setBoardSquare: (
    updatedBoardSquare: boardSquare,
  ) => void
}

function BoardSquare(props: boardSquareProps): JSX.Element {

  function updateSquare(): void {
    const updatedSquare = props.square;
    updatedSquare.active = !updatedSquare.active;
    props.setBoardSquare(updatedSquare);
  }

  const square =
    <div
      className={`board-square ${props.square.active ? '' : 'inactive'}`}
      onClick={updateSquare}
    >
      {`${props.rowIndex}-${props.colIndex}`}
    </div>
  
  return square;
}

export default BoardSquare;