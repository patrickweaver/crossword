import React from 'react';

interface boardSizeProps {
  boardSize: number,
  updateBoardSize: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function BoardSize(props: boardSizeProps): JSX.Element {

  return (
    <div id="board-size">
      <label>Board Size:</label>
      <input type="number" value={props.boardSize} onChange={props.updateBoardSize} />
    </div>
  )
}