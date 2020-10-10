import React from 'react';
import './Board.css';
import BoardSquare from './BoardSquare';

// Types:
import { boardSquare, clueAnswer } from './types';

export interface boardProps {
  clueAnswers: clueAnswer[][],
  board: any,
  boardSize: number,
  updateBoard: (board: boardSquare[][]) => void,
}

function Board(props: boardProps): JSX.Element {

  const createBoardSquareSetter = (rowIndex: number, colIndex: number): (updatedSquare: boardSquare) => void => {
    return (updatedSquare: boardSquare) => {
      const updatedBoard: boardSquare[][] = [...props.board];
      updatedBoard[rowIndex][colIndex] = updatedSquare;
      props.updateBoard(updatedBoard);
    }
  }

  const boardSquares: JSX.Element = props.board.map((row: boardSquare[], rowIndex: number): JSX.Element => {
    return (
      <div key={`row-${rowIndex}`} className="board-row">
        {
          row.map((square: boardSquare, colIndex: number): JSX.Element => {
            return <BoardSquare
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              boardSize={props.boardSize}
              square={square}
              setBoardSquare={createBoardSquareSetter(rowIndex, colIndex)}
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