import React from 'react';

interface clueAnswer {
  clue: string;
  answer: string;
}

export interface cluesProps {
  clueAnswers: clueAnswer[],
  setClueAnswers: (clueAnswers: clueAnswer[]) => void
}

function Clues(props: cluesProps): JSX.Element {
  
  console.log(props.clueAnswers)
  
  return (
    <div>
      <h2>Clues</h2>
      <ul>
        {props.clueAnswers.map((item: clueAnswer, index: number) => {
          return (
            <li key={index}>
              <input
                value={item.clue}
                onChange={event => {
                  const newClueAnswers: clueAnswer[] = [...props.clueAnswers];
                  newClueAnswers[index].clue = event.target.value;
                  return props.setClueAnswers(newClueAnswers);
                }}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Clues;