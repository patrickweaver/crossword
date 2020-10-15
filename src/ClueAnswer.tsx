import React from 'react';

// Types:
import { clueAnswer } from './types';

export interface clueAnswerProps {
  // dirIndex: number,
  // index: number,
  clueAnswer: clueAnswer,
  updateClueAnswer: (type: ("answer" | "clue"), newValue: string) => void,
}

function ClueAnswer(props: clueAnswerProps): JSX.Element {

  function updateAnswer(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, selectionStart, selectionEnd } = event.target;
    return props.updateClueAnswer("answer", value);
  }

  function updateClue(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    return props.updateClueAnswer("clue", value);
  }
  
  return (
      <div>
        <label>Clue:</label>
        <input
          value={props.clueAnswer.clue}
          onChange={updateClue}
        />
        <label>Answer:</label>
        <input
          className="answer"
          value={props.clueAnswer.answer}
          onChange={updateAnswer}
        />
      </div>
  )
}

export default ClueAnswer;