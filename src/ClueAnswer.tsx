import React, { useRef, useState, useEffect } from 'react';

import './ClueAnswer.css';

// Types:
import { clueAnswer } from './types';

interface clueAnswerProps {
  clueAnswer: clueAnswer,
  updateClueAnswer: (type: ("answer" | "clue"), newValue: string, selectionStart?: number) => void,
}

function ClueAnswer(props: clueAnswerProps): JSX.Element {

  const answerInputRef = useRef<HTMLInputElement>(null);

  const [selectionStart, setSelectionStart] = useState<(number | null)>(0);

  useEffect((): void => {
    if (answerInputRef.current && selectionStart !== null) {
      const start = selectionStart || 0;
      answerInputRef.current.setSelectionRange(start, start);
      setSelectionStart(null);
    }
  }, [selectionStart]);

  function updateAnswer(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, selectionStart} = event.target;
    setSelectionStart((selectionStart || 0));
    props.updateClueAnswer("answer", value.toUpperCase(), selectionStart || 0);
  }

  function updateClue(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    props.updateClueAnswer("clue", value);
  }

  const answerInputStyle = {
    background: `repeating-linear-gradient(90deg, black 0, black 1.25ch, transparent 0, transparent 2ch) 5px 85%/ ${props.clueAnswer.answer.length * (2)}ch 1px no-repeat`
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
        style={answerInputStyle}
        className="answer"
        ref={answerInputRef}
        value={props.clueAnswer.answer}
        onChange={updateAnswer}
      />
    </div>
  )
}

export default ClueAnswer;