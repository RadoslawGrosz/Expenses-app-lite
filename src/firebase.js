import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCL2q_qXPbbG0o77ARyC4B5FVfjE_tVKcA",
  authDomain: "expenses-app-e5319.firebaseapp.com",
  projectId: "expenses-app-e5319",
  storageBucket: "expenses-app-e5319.appspot.com",
  messagingSenderId: "526409344250",
  appId: "1:526409344250:web:ce64b85bf6c5ccdd895543",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
