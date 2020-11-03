import React from 'react';

import './Footer.css';

export default function Footer(): JSX.Element {

  return (
    <div id="footer">
      <ul>
        <li>Made by <a href="https://www.patrickweaver.net/">Patrick Weaver</a></li>
        <li><a href="https://github.com/patrickweaver/crossword">View Source</a></li>
      </ul>
    </div>
  )
}