import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: 'AIzaSyCyqVx31g5-GDoUmoMEPLHKcqmid5UrJIE',
  authDomain: 'wework-beer.firebaseapp.com',
  databaseURL: 'https://wework-beer.firebaseio.com',
  projectId: 'wework-beer',
  storageBucket: 'wework-beer.appspot.com',
  messagingSenderId: '995289530050'
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
