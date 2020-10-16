import React from 'react';
import './Clues.css';

import ClueAnswer from './ClueAnswer';

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
          return (
            <li key={index} value={item.number}>
              <ClueAnswer
                clueAnswer={item}
                updateClueAnswer={(type: ("answer" | "clue"), newValue: string) => props.updateClueAnswer(type, newValue, dirIndex, index)}
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