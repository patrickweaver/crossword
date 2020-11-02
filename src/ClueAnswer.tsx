import React, { useRef, useState, useEffect } from 'react';

import './ClueAnswer.css';

// Types:
import { clueAnswer } from './types';

interface clueAnswerProps {
  clueAnswer: clueAnswer,
  updateClueAnswer: (
    type: ("answer" | "clue"),
    newValue: string,
    index: number,
    dirIndex: number,
    selectionStart?: number
  ) => void,
  dirIndex: number,
  index: number,
  mode: string,
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
    props.updateClueAnswer("answer", value.toUpperCase(), props.index, props.dirIndex, selectionStart || 0);
  }

  function updateClue(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    props.updateClueAnswer("clue", value, props.index, props.dirIndex);
  }

  const answerInputStyle = {
    background: `repeating-linear-gradient(90deg, black 0, black 1.25ch, transparent 0, transparent 2ch) 5px 85%/ ${props.clueAnswer.answer.length * (2)}ch 1px no-repeat`
  }

  let answer;
  let clue;
  if (props.mode === "editor") {
    answer = (
      <span>
        <label>Answer:</label>
        <input
          style={answerInputStyle}
          className="answer"
          ref={answerInputRef}
          value={props.clueAnswer.answer}
          onChange={updateAnswer}
        />
      </span>
    )
    clue = (
      <span>
        <label>Clue:</label>
        <input
          className="clue"
          value={props.clueAnswer.clue}
          onChange={updateClue}
        />
      </span>
    )
  } else {
    clue = (
      <div>
        <p>
          {props.clueAnswer.clue}
        </p>
      </div>
    )
  }

  return (
    <div className="clue-answer">
      {clue}
      {answer}
    </div>
  )
}

export default ClueAnswer;