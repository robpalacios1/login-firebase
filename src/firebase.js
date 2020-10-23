import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDTMNNRtU6xWW-uwHULqcvEmH6nRdjbPEQ",
    authDomain: "login-640dc.firebaseapp.com",
    databaseURL: "https://login-640dc.firebaseio.com",
    projectId: "login-640dc",
    storageBucket: "login-640dc.appspot.com",
    messagingSenderId: "841365403752",
    appId: "1:841365403752:web:e17c6232d06e13008823dd"
  };
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db, auth}