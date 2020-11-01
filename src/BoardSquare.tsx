import React from 'react';
import './BoardSquare.css';

// Types:
import { boardSquare } from './types';

interface boardSquareProps {
  rowIndex: number,
  colIndex: number,
  square: boardSquare,
  boardSize: number,
  setBoardSquare: (
    updatedSquare: boardSquare,
  ) => void,
  mode: string,
  answer: (string | null),
  selectedSquare: [number, number],
  onSelectSquare: (rowIndex: number, colIndex: number) => void,
  selectedDirection: string,
  moveInput: (squareNumber: number) => void,
}

function BoardSquare(props: boardSquareProps): JSX.Element {

  function toggleSquareActive(event: React.MouseEvent<HTMLDivElement>): void {
    // This is kind of a hack, on double click call the onSelectSquare
    // function again to cancel out the highlighted row toggle that
    // happened on the first click.
    props.onSelectSquare(-1, -1);
    const updatedSquare = props.square;
    updatedSquare.active = !updatedSquare.active;
    updatedSquare.letter = "";
    props.setBoardSquare(updatedSquare);
  }

  function addLetter(event: React.ChangeEvent<HTMLInputElement>): void {
    const updatedSquare = props.square;
    updatedSquare.letter = event.target.value.toUpperCase();
    props.setBoardSquare(updatedSquare);
    const target = event.target;
    target.setSelectionRange(0, target.value.length)
    props.moveInput(props.square.squareNumber);
  }

  function selectLetterOnFocus(event: (React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>)): void {
    props.onSelectSquare(props.square.acrossWordNumber || 0, props.square.downWordNumber || 0)
    const target = event.target as HTMLInputElement;
    target.setSelectionRange(0, target.value.length); 
  }

  // Set class for guess in Game mode
  const letterClass: string = props.mode === "game" ? (props.answer === props.square.letter ? "correct" : "incorrect") : "";

  // Set class for selected row or column
  let selected: string = "";
  if (
    (
      props.selectedSquare[0] === props.square.acrossWordNumber
      && props.selectedDirection === "across"
    ) || (
      props.selectedSquare[1] === props.square.downWordNumber
      && props.selectedDirection === "down"
    ) && props.square.active
  ) {
    selected = "selected";
  }

  const letter = 
    <div className="letter">
      <input
        id={`${props.square.squareNumber}-input`}
        className={letterClass}
        type="text"
        value={props.square.letter || ''}
        onChange={addLetter}
        onClick={selectLetterOnFocus}
        maxLength={1}
      />
    </div>

  const square =
    <div
      className={`board-square ${props.square.active ? selected : 'inactive'}`}
      onDoubleClick={toggleSquareActive}
    >
      <div className="clue-number">
        {`${props.square.wordStart[0] ? props.square.acrossWordNumber : (props.square.wordStart[1] ? props.square.downWordNumber : '')}`}
      </div>

      {props.square.active ? letter : null}
      
    </div>
  
  return square;
}

export default BoardSquare;