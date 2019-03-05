const firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp({
	apiKey: "AIzaSyCyqVx31g5-GDoUmoMEPLHKcqmid5UrJIE",
	authDomain: "wework-beer.firebaseapp.com",
	databaseURL: "https://wework-beer.firebaseio.com",
	projectId: "wework-beer",
	storageBucket: "wework-beer.appspot.com",
	messagingSenderId: "995289530050"
});

firebase.firestore();

export default firebase;
