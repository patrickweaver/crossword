import React, { useState } from 'react';

import './BoardSize.css';


interface boardSizeProps {
  boardSize: number,
  updateBoardSize: (newBoardSize: number) => void,
}

export default function BoardSize(props: boardSizeProps): JSX.Element {

  const [editing, setEditing] = useState(false);
  const [tempBoardSize, setTempBoardSize] = useState(props.boardSize);

  function tempUpdateBoardSize(event: React.ChangeEvent<HTMLInputElement>): void {
    console.log(event.target);
    console.log(document.activeElement);
    const newBoardSize: number = parseInt(event.target.value);
    setTempBoardSize(newBoardSize)
  }

  function endEditing(): void {
    setEditing(false);
    props.updateBoardSize(tempBoardSize);
  }

  let boardSize;
  if (editing) {
    boardSize = (
      <div>
        <label className="bs-label">
          Update Board Size:
        </label>
        <input
          className="bs-element"
          type="number"
          value={tempBoardSize}
          onChange={tempUpdateBoardSize}
        />
        <button
          className="bs-element"
          onClick={endEditing}
        >
          Save
        </button>
      </div>
    )
  } else {
    boardSize = (
      <div>
        <h4 className="bs-element">
          Board Size: {props.boardSize}
        </h4>
        <button
          className="bs-element"
          onClick={() => setEditing(true)}
        >
          Change
        </button>
      </div>
    )
  }

  return (
    <div id="board-size">
      {boardSize}
    </div>
  )
}