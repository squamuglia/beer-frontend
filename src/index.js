import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import reducer from './reducers/reducer.js';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

console.log('index js store', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
