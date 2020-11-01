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
}

function BoardSquare(props: boardSquareProps): JSX.Element {

  function toggleSquareActive(event: React.MouseEvent<HTMLDivElement>): void {
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
    setTimeout(() => target.setSelectionRange(0, target.value.length), 0)
  }

  function selectLetterOnFocus(event: (React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>)): void {
    props.onSelectSquare(props.rowIndex, props.colIndex)
    const target = event.target as HTMLInputElement;
    target.setSelectionRange(0, target.value.length); 
  }

  const letterClass: string = props.mode === "game" ? (props.answer === props.square.letter ? "correct" : "incorrect") : "";

  let selected: string = "";
  if (
    (
      props.selectedSquare[0] === props.rowIndex
      && props.selectedDirection === "across"
    ) || (
      props.selectedSquare[1] === props.colIndex
      && props.selectedDirection === "down"
    ) && props.square.active
  ) {
    console.log("TRUE", props.rowIndex, props.colIndex)
    selected = "selected";
  }

  const letter = 
    <div className="letter">
      <input
        className={letterClass}
        type="text"
        value={props.square.letter || ''}
        onChange={addLetter}
        onClick={selectLetterOnFocus}
        //onFocus={selectLetterOnFocus}
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