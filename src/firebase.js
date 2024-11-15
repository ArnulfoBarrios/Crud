import firebase from "firebase/app";
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyArJMiAbdDMwqnMsc90euMY1EVkR7TlhZ0",
  authDomain: "desarrollo-web-act-1.firebaseapp.com",
  projectId: "desarrollo-web-act-1",
  storageBucket: "desarrollo-web-act-1.firebasestorage.app",
  messagingSenderId: "705723021697",
  appId: "1:705723021697:web:ecb91c3d2cbb191c001080",
  measurementId: "G-X72F7YS1L9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export {firebase}