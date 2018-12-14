import React from 'react';
import ReactDOM from 'react-dom';

import Marquee from './Marquee';

import './style.css';

ReactDOM.render(
  <div
    style={{
      width: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: '32px',
    }}
  >
    <Marquee gap={30} duration={20}>
      <strong>Missing Data</strong> – Today&apos;s analytics continue to arrive
      slowly, and will remain incomplete for the next hour or so. This data is
      from 10:23am.
    </Marquee>
  </div>,
  document.getElementById('root')
);
