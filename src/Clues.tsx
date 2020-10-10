import React from 'react';
import './Clues.css';

// Types:
import { clueAnswer } from './types';

export interface cluesProps {
  clueAnswers: clueAnswer[],
  setClueAnswers: (clueAnswers: clueAnswer[]) => void
}

function Clues(props: cluesProps): JSX.Element {
  
  return (
    <div>
      <h2>Clues</h2>
      <ol className="clue-answers-list">
        {props.clueAnswers.map((item: clueAnswer, index: number) => {
          const clueNumber = index + 1;
          return (
            <li key={index}>
              <label>Clue:</label>
              <input
                value={item.clue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                  const newClueAnswers: clueAnswer[] = [...props.clueAnswers];
                  newClueAnswers[index].clue = event.target.value;
                  return props.setClueAnswers(newClueAnswers);
                }}
              />
              <label>Answer:</label>
              <input
                value={item.answer}
                onChange={event => {
                  const newClueAnswers: clueAnswer[] = [...props.clueAnswers];
                  newClueAnswers[index].answer = event.target.value;
                  return props.setClueAnswers(newClueAnswers);
                }}
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Clues;