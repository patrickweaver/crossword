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
  onSelectSquare: (rowIndex: number, colIndex: number, updateDirection: boolean) => void,
  selectedDirection: string,
  setSelectedDirection: (direction: string) => void,
  moveInput: (squareNumber: number, command: ("right" | "left" | "down" | "up"), updateDirection: boolean) => void,
  checkAnswers: boolean,
}

function BoardSquare(props: boardSquareProps): JSX.Element {

  function toggleSquareActive(event: React.MouseEvent<HTMLDivElement>): void {
    // Should only be able to toggle in editor
    if (props.mode === "game") return;
    // This is kind of a hack, on double click call the onSelectSquare
    // function again to cancel out the highlighted row toggle that
    // happened on the first click.
    props.onSelectSquare(-1, -1, false);
    const updatedSquare = props.square;
    updatedSquare.active = !updatedSquare.active;
    updatedSquare.letter = "";
    props.setBoardSquare(updatedSquare);
  }

  function addLetter(event: React.ChangeEvent<HTMLInputElement>): void {
    // This object will be updated
    const updatedSquare = props.square;
    // Update letter value from event
    const target = event.target;
    updatedSquare.letter = target.value.toUpperCase();
    props.setBoardSquare(updatedSquare);
    // Select correct amount of word (for deletions)
    target.setSelectionRange(0, target.value.length);
    
    // Don't increment input square on delete
    if (updatedSquare.letter.length === 0) {
      return;
    }
    // Increment input square on letter input
    const command = props.selectedDirection === "down" ? "down" : "right";
    props.moveInput(props.square.squareNumber, command, false);
  }

  function selectLetterOnFocus(event: (React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>)): void {
    props.onSelectSquare(props.square.acrossWordNumber || 0, props.square.downWordNumber || 0, true)
    const target = event.target as HTMLInputElement;
    target.setSelectionRange(0, target.value.length); 
  }

  // Navigate with arrow keys or backspace
  // all other keys are ignored.
  function keyPressed(event: React.KeyboardEvent): void {
    let command: ("up" | "left" | "down" | "right" | null) = null;

    // Override default behavior
    if (
      event.key === "ArrowUp"
      || event.key === "ArrowDown"
      || event.key === "Backspace"
    ) {
      event.preventDefault(); 
    }

    // Update selected direction
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      props.setSelectedDirection("down");
    } else if (event.key ===  "ArrowLeft" || event.key === "ArrowRight") {
      props.setSelectedDirection("across");
    }

    // Clear content on backspace
    if (event.key === "Backspace") {
      const updatedSquare = props.square;
      updatedSquare.letter = "";
      props.setBoardSquare(updatedSquare);
    }

    if (
      event.key === "ArrowUp"
      || (props.selectedDirection === "down" && event.key === "Backspace")
    ) command = "up";
    if (
      event.key === "ArrowLeft"
      || (props.selectedDirection === "across" && event.key === "Backspace")
    ) command = "left";
    if (event.key === "ArrowDown") command = "down";
    if (event.key === "ArrowRight") command = "right";
    if (command !== null) {
      props.moveInput(props.square.squareNumber, command as ("up" | "left" | "down" | "right"), false);
    }
  }

  // Set class for guess in Game mode
  const letterClass: string = (props.mode === "game" && props.checkAnswers) ? (props.answer === props.square.letter ? "correct" : "incorrect") : "";

  // Set class for selected row or column
  let selected: string = "";
  const acrossMatch = props.selectedSquare[0] === props.square.acrossWordNumber;
  const downMatch = props.selectedSquare[1] === props.square.downWordNumber
  if (
    (
      (
        acrossMatch
        && props.selectedDirection === "across"
      ) || (
        downMatch
        && props.selectedDirection === "down"
      )
    )
    && props.square.active
  ) {
    selected = "selected-word";
    if (acrossMatch && downMatch) {
      selected += " selected-square"
    }
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
        onKeyDown={keyPressed}
        autoComplete="off"
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