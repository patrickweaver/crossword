import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import Clues from './Clues';

interface clueAnswer {
  clue: string;
  answer: string;
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
]

function App() {

  const [boardSize, setBoardSize] = useState(10)
  const [board, setBoard] = useState([[]])
  const [clueAnswers, setClueAnswers] = useState<clueAnswer[]>(defaultClueAnswerArray)

  return (
    <div className="App">
      <h1>Crossword Puzzle Editor</h1>
      <Board clueAnswers={clueAnswers} boardSize={boardSize} />
      <Clues clueAnswers={clueAnswers} setClueAnswers={setClueAnswers} />
    </div>
  );
}

export default App;
