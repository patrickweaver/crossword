import React from 'react';
import './Clues.css';

import ClueAnswer from './ClueAnswer';

// Types:
import { clueAnswer } from './types';

interface cluesProps {
  clueAnswers: clueAnswer[][],
  updateClueAnswer?: (type: ("answer" | "clue"), newValue: string, dirIndex: number, caIndex: number, selectionStart?: number) => void,
  mode: string,
}

function Clues(props: cluesProps): JSX.Element {

  function updateClueAnswer(
    type: ("answer" | "clue"),
    newValue: string,
    index: number,
    dirIndex: number,
    selectionStart?: number, // Undefined for clues
  ) {
    if (props.updateClueAnswer) {
      props.updateClueAnswer(type, newValue, dirIndex, index, selectionStart)
    }
  }

  const cluesList = (clueAnswers: clueAnswer[], dirIndex: number): JSX.Element => {

    return (
      <ol className="clue-answers-list">
        {clueAnswers.map(
          (item: clueAnswer, index: number) => {

            return (
              <li key={index} value={item.number}>
                <ClueAnswer
                  clueAnswer={item}
                  updateClueAnswer={updateClueAnswer}
                  dirIndex={dirIndex}
                  index={index}
                  mode={props.mode}
                />
              </li>
            )
          }
        )}
      </ol>
    )
  }
  
  return (
    <div>
      <h2>Clues</h2>
        <ul className="clue-answers">
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