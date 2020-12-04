import React from 'react';

interface suggestionsProps {
  possibleAnswers: string[]
}

function Suggestions(props: suggestionsProps): JSX.Element {

  const suggestionsList = props.possibleAnswers.map((answer: string): JSX.Element => {
    return (
      <li key={answer}>{answer}</li>
    )
  });
  
  return (
    <div>
        <h2>Suggestions</h2>
        <ol>
          {suggestionsList}
        </ol>
    </div>
  )
}

export default Suggestions;