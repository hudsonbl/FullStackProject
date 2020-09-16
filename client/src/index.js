import React from 'react';
import ReactDOM from 'react-dom';
import store from './cache/config/store'
import App from './App';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
