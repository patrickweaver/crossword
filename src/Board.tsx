import React from 'react';
import './Board.css';
import BoardSquare from './BoardSquare';

interface clueAnswer {
  clue: string;
  answer: string;
}

interface boardSquare {
  letter: string | null;
  wordStart: number | null;
  horizontalWordNumber: number | null;
  verticalWordNumber: number | null;
}

export interface boardProps {
  clueAnswers: clueAnswer[],
  board: any,
  setBoard: (board: any) => void
}

function Board(props: boardProps): JSX.Element {

  const boardSquares: JSX.Element = props.board.map((row: boardSquare[], rowIndex: number): JSX.Element => {
    return (
      <div key={`row-${rowIndex}`} className="board-row">
        {
          row.map((col: boardSquare, colIndex: number): JSX.Element => {
            return <BoardSquare
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          })
        }
      </div>
    )
  })

  const board: JSX.Element = 
    <div id="board">
      {boardSquares}
    </div>
  
  return (
    <div>
      <h2>Board</h2>
      {board}
    </div>
  )
}

export default Board;