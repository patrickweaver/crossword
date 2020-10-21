import React from 'react';

export interface modeSelectProps {
  mode: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function ModeSelect(props: modeSelectProps): JSX.Element {
  
  return (
    <div>
      <h3>Current Mode: <span>{props.mode}</span></h3>
      <select onChange={props.onChange}>
        <option>normal</option>
        <option>horizontal</option>
        <option>vertical</option>
        <option>diagonal</option>
        <option>horizontal-vertical</option>
        <option>square</option>
      </select>
    </div>
  );
}