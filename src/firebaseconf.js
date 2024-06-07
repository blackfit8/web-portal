// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUx9TNxLCMwH0ptDMwlzkW1480xnyX75c",
  authDomain: "numenportaldb.firebaseapp.com",
  projectId: "numenportaldb",
  storageBucket: "numenportaldb.appspot.com",
  messagingSenderId: "748712766478",
  appId: "1:748712766478:web:2b0db18afa597e5763205f",
  measurementId: "G-2G4MP0TM9Q"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;