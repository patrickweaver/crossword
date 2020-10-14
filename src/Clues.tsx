import React from 'react';
import './Clues.css';

// Types:
import { clueAnswer } from './types';

export interface cluesProps {
  clueAnswers: clueAnswer[][],
  updateClueAnswer: (type: ("answer" | "clue"), newValue: string, dirIndex: number, caIndex: number) => void,
}

function Clues(props: cluesProps): JSX.Element {

  const cluesList = (clueAnswers: clueAnswer[], dirIndex: number): JSX.Element => {
    return (
      <ol className="clue-answers-list">
        {clueAnswers.map((item: clueAnswer, index: number) => {
          const clueNumber = index + 1;
          return (
            <li key={index}>
              <span>{item.number}</span>
              <label>Clue:</label>
              <input
                value={item.clue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                  // const newClueAnswers: clueAnswer[][] = [...props.clueAnswers];
                  // newClueAnswers[dirIndex][index].clue = event.target.value;
                  // return props.updateClueAnswers(newClueAnswers);
                  const newValue = event.target.value;
                  return props.updateClueAnswer("clue", newValue, dirIndex, index);
                }}
              />
              <label>Answer:</label>
              <input
                className="answer"
                value={item.answer}
                onChange={event => {
                  // const newClueAnswers: clueAnswer[][] = [...props.clueAnswers];
                  // newClueAnswers[dirIndex][index].answer = event.target.value;
                  // return props.updateClueAnswers(newClueAnswers);
                  const newValue = event.target.value;
                  return props.updateClueAnswer("answer", newValue, dirIndex, index);
                }}
              />
            </li>
          )
        })}
      </ol>
    )
  }
  
  return (
    <div>
      <h2>Clues</h2>
        <ul>
          <li>
            <h3>Across:</h3>
            {cluesList(props.clueAnswers[0], 0)}
          </li>
          <li>
            <h3>Down:</h3>
            {cluesList(props.clueAnswers[1], 1)}
          </li>

        </ul>
    </div>
  )
}

export default Clues;