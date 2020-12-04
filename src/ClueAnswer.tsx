import React, { useRef, useState, useEffect } from 'react';

import './Suggestions.tsx';

import './ClueAnswer.css';

// Types:
import { clueAnswer } from './types';
import Suggestions from './Suggestions';

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
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    background: `repeating-linear-gradient(90deg, black 0, black 1.25ch, transparent 0, transparent 2ch) 5px 85%/ ${props.clueAnswer.answer.length * (2)}ch 1px no-repeat`,
    width: `Calc(2ch * ${props.clueAnswer.answer.length} - 1px)`,
  }

  const {possibleAnswers} = props.clueAnswer

  let answer;
  let clue;
  if (props.mode === "editor") {

    
    if (possibleAnswers?.length) {
      //console.log(possibleAnswers.slice(0, 10));
    }

    answer = (
      <li>
        <label className="ca-label">Answer:</label>
        <input
          style={answerInputStyle}
          className="answer"
          ref={answerInputRef}
          value={props.clueAnswer.answer}
          onChange={updateAnswer}
          autoComplete="off"
        />
      </li>
    )
    clue = (
      <li>
        <label className="ca-label">Clue:</label>
        <input
          className="clue"
          value={props.clueAnswer.clue}
          onChange={updateClue}
          autoComplete="off"
        />
      </li>
    )
  } else {
    clue = (
      <li>
        <p>
          {props.clueAnswer.clue}
        </p>
      </li>
    )
  }

  let suggestionsButton;
  if (possibleAnswers) {
    suggestionsButton = (
      <button onClick={() => setShowSuggestions(true)}>
        {possibleAnswers?.length}
      </button>
    )
  }

  let suggestionsModal;
  if (showSuggestions && possibleAnswers) {
    suggestionsModal = (
      <Suggestions possibleAnswers={possibleAnswers} />
    )
  }

  return (
    <>
      <ul className="clue-answer">
        {clue}
        {answer}
        {suggestionsButton}
      </ul>
      {suggestionsModal}
    </>
  )
}

export default ClueAnswer;