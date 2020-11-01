import React from 'react';
import './Board.css';
import BoardSquare from './BoardSquare';

// Types:
import { boardSquare, clueAnswer } from './types';

interface boardProps {
  clueAnswers: clueAnswer[][],
  board: boardSquare[][],
  correctBoard?: boardSquare[][],
  boardSize: number,
  updateBoard: (board: boardSquare[][]) => void,
  mode: string,
  onSelectSquare: (rowIndex: number, colIndex: number) => void,
}

function Board(props: boardProps): JSX.Element {

  const createBoardSquareSetter = (rowIndex: number, colIndex: number): (updatedSquare: boardSquare) => void => {
    const end = props.boardSize - 1;
    const mode = props.mode;
    let partners: number[][] = [];
    
    if (mode === 'diagonal' || mode === 'square') {
      const partnerIndexes = [end - rowIndex, end - colIndex];
      partners.push(partnerIndexes);
    }
    
    if (mode === 'horizontal' || mode === 'horizontal-vertical'|| mode === 'square') {
      const partnerIndexes = [rowIndex, end - colIndex];
      partners.push(partnerIndexes);
    }
    
    if (mode === 'vertical' || mode === 'horizontal-vertical'|| mode === 'square') {
      const partnerIndexes = [end - rowIndex, colIndex];
      partners.push(partnerIndexes);
    }

    return (updatedSquare: boardSquare) => {
      const updatedBoard: boardSquare[][] = [...props.board];
      const newStatus = updatedSquare.active;
      updatedBoard[rowIndex][colIndex] = updatedSquare;
      partners.forEach(partner => {
        const [pRow, pCol] = partner;
        updatedBoard[pRow][pCol].active = newStatus;
      });
      props.updateBoard(updatedBoard);
    }
  }

  const boardSquares: JSX.Element[] = props.board.map((row: boardSquare[], rowIndex: number): JSX.Element => {
    return (
      <div key={`row-${rowIndex}`} className="board-row">
        {
          row.map((square: boardSquare, colIndex: number): JSX.Element => {
            const answer = props.correctBoard ? props.correctBoard[rowIndex][colIndex].letter : null;
            return <BoardSquare
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              boardSize={props.boardSize}
              square={square}
              setBoardSquare={createBoardSquareSetter(rowIndex, colIndex)}
              mode={props.mode}
              answer={answer}
              onSelectSquare={props.onSelectSquare}
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