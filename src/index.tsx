import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import GlobalStyle from './GlobalStyle';

ReactDOM.render(
  <Fragment>
    <App />
    <GlobalStyle />
  </Fragment>,
  document.getElementById('root')
);
