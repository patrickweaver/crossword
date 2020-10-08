import React from 'react';

interface clueAnswer {
  clue: string;
  answer: string;
}

export interface boardProps {
  clueAnswers: clueAnswer[],
  boardSize: number
}

function Clues(props: boardProps): JSX.Element {
  
  return (
    <div>
      <h2>Board</h2>
    </div>
  )
}

export default Clues;