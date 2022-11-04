// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
var initializeApp = require('firebase/app')
// var getAnalytics = require('firebase/analytics')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZq9bQ2kQVE6NN5DKpXgr_J_HU99Hu6GA",
  authDomain: "team-beta-3c78b.firebaseapp.com",
  projectId: "team-beta-3c78b",
  storageBucket: "team-beta-3c78b.appspot.com",
  messagingSenderId: "1000246916362",
  appId: "1:1000246916362:web:db873b0feecc77b01bf6f3",
  measurementId: "G-S9C338C3DK"
};
firebaseConfig.initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);