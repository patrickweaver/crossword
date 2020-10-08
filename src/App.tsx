import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import Clues from './Clues';

interface clueAnswer {
  clue: string;
  answer: string;
}

interface boardSquare {
  active: boolean;
  letter: string | null;
  wordStart: number | null;
  horizontalWordNumber: number | null;
  verticalWordNumber: number | null;
}

const defaultClueAnswerArray: clueAnswer[] = [
  {
    clue: "Test",
    answer: ""
  },
  {
    clue: "",
    answer: ""
  },
];

const defaultBoardSize: number = 10;
const rowCols = Array.from({length: defaultBoardSize}, (_, id) => ({id}));
const initialBoard: boardSquare[][] = rowCols.map((row, rowIndex) => {
  return rowCols.map((col, colIndex) => {
    const bs: boardSquare = {
      active: true,
      letter: " ",
      wordStart: rowIndex === 0 ? colIndex + 1 : colIndex === 0 ? rowIndex + 1 : null,
      horizontalWordNumber: colIndex + 1,
      verticalWordNumber: rowIndex + 1
    }
    return bs;
  })
})

function App() {

  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [board, setBoard] = useState<boardSquare[][]>(initialBoard);
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[]>(defaultClueAnswerArray);

  function recalculateBoard(updatedBoard: boardSquare[][]): void {
    
    setBoard(updatedBoard);
  }

  return (
    <div className="App">
      <h1>Crossword Puzzle Editor</h1>
      <Board
        clueAnswers={clueAnswers}
        board={board}
        updateBoard={recalculateBoard}
      />
      <Clues clueAnswers={clueAnswers} setClueAnswers={setClueAnswers} />
    </div>
  );
}

export default App;
