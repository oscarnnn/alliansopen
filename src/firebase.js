import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyBu50DAgF3nD7ISWbWk-5spDKgRLv7GEAY",
  authDomain: "shaftshankredemption.firebaseapp.com",
  projectId: "shaftshankredemption",
  storageBucket: "shaftshankredemption.appspot.com",
  messagingSenderId: "967999160114",
  appId: "1:967999160114:web:86a7090423094ba1b9e12b",
  measurementId: "G-4FZFWWX7RW"
};

let firebaseApp ;

  if (!firebase.apps.length) {
     firebaseApp = firebase.initializeApp(firebaseConfig);
  }
  else {
    firebaseApp = firebase.app(); // if already initialized, use that one
  }

export default firebaseApp;