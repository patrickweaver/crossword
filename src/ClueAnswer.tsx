import React, { useRef, useState, useEffect } from 'react';

import './ClueAnswer.css';

// Types:
import { clueAnswer } from './types';

export interface clueAnswerProps {
  clueAnswer: clueAnswer,
  updateClueAnswer: (type: ("answer" | "clue"), newValue: string) => void,
}

function ClueAnswer(props: clueAnswerProps): JSX.Element {

  const answerInputRef = useRef<HTMLInputElement>(null);
  //const cursorPosition = 0;

  const [selectionStart, setSelectionStart] = useState(0);

  useEffect((): void => {
    if (answerInputRef.current) {
      answerInputRef.current.setSelectionRange(selectionStart, selectionStart);
    }
  })

  function updateAnswer(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, selectionStart} = event.target;
    setSelectionStart((selectionStart || 0));
    props.updateClueAnswer("answer", value);
  }

  function updateClue(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    props.updateClueAnswer("clue", value);
  }

  return (
    <div className="clue-answer">
      <label>Clue:</label>
      <input
        value={props.clueAnswer.clue}
        onChange={updateClue}
      />
      <label>Answer:</label>
      <input
        className="answer"
        ref={answerInputRef}
        value={props.clueAnswer.answer}
        onChange={updateAnswer}
      />
    </div>
  )
}

export default ClueAnswer;