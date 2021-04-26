import firebase from "firebase/app";


import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyClYRq-Y6wtKxUECxMLgE3OE_EmjVMf7Ws",
    authDomain: "clien-7599e.firebaseapp.com",
    databaseURL: "https://clien-7599e-default-rtdb.firebaseio.com",
    projectId: "clien-7599e",
    storageBucket: "clien-7599e.appspot.com",
    messagingSenderId: "1013312474734",
    appId: "1:1013312474734:web:3a0b3d920164dd1ed8607f",
    measurementId: "G-JSMGQVCFS6"
  };
  const firebase=initializeApp(firebaseConfig);
 firebase.analytics();
 export default firebaseApp.firestore();