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
  mode: string,
}

function Board(props: boardProps): JSX.Element {

  const createBoardSquareSetter = (rowIndex: number, colIndex: number): (updatedSquares: boardSquare[]) => void => {

    let partners: number[][] = [];

    if (props.mode === 'normal') {

    } else if (props.mode === 'diagonal') {
      //const index = (props.rowIndex - 1 * props.boardSize) + props.colIndex;
      //const partnerIndex = (props.boardSize * props.boardSize) - 1 - index;
      const partnerIndex = [props.boardSize - rowIndex - 1, props.boardSize - colIndex - 1]

      partners.push(partnerIndex)
    } else if (props.mode === 'horizontal') {

    } else if (props.mode === 'vertical') {

    } else {
      // Mode doens't exist yet.
    }


    return (updatedSquares: boardSquare[]) => {
      const updatedBoard: boardSquare[][] = [...props.board];
      updatedBoard[rowIndex][colIndex] = updatedSquares[0];
      updatedBoard[partners[0][0]][partners[0][1]].active = !props.board[partners[0][0]][partners[0][1]].active
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
              mode={props.mode}
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