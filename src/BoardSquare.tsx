import React from 'react';
//import './BoardSquare.css';

interface boardSquare {
  letter: string | null;
  wordStart: number | null;
  horizontalWordNumber: number | null;
  verticalWordNumber: number | null;
}

export interface boardSquareProps {
  rowIndex: number,
  colIndex: number,
}

function BoardSquare(props: boardSquareProps): JSX.Element {
  
  return (
    <div className="board-square">
      {`${props.rowIndex}-${props.colIndex}`}
    </div>
  )
}

export default BoardSquare;