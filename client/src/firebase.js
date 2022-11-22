// import firebase from 'firebase/compat/app';
// import 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyAEjN1kfzJUvl1p-eRAZ1JdJNn_DNYrwb8",
//   authDomain: "ptit-learn-app.firebaseapp.com",
//   projectId: "ptit-learn-app",
//   storageBucket: "ptit-learn-app.appspot.com",
//   messagingSenderId: "149937631687",
//   appId: "1:149937631687:web:0731f3a14ec85b7d10e9e2",
//   measurementId: "G-Y98P92YX8W"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDRc0yI742yo4G0OF9OVsRp4gU4bYi9rgA",
    authDomain: "pacard-thuhuong-f9f39.firebaseapp.com",
    projectId: "pacard-thuhuong-f9f39",
    storageBucket: "pacard-thuhuong-f9f39.appspot.com",
    messagingSenderId: "1020141653299",
    appId: "1:1020141653299:web:9b7a188736fa0eb035c246",
    measurementId: "G-GGXPD6BW5J"
  };

// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
// export default storage;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
export default storage;
