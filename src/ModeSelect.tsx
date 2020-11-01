import React from 'react';

import './ModeSelect.css';

export interface modeSelectProps {
  mode: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function ModeSelect(props: modeSelectProps): JSX.Element {
  
  return (
    <div className="mode-select">
      <h4>Toggle Square Mode:</h4>
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