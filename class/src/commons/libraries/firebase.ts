// ///////////// 파이어베이스 /////////////
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo0bD1Ls-AxHShpHPd3TLrrDnKK8mHyXo",
  authDomain: "codecamp-null.firebaseapp.com",
  projectId: "codecamp-null",
  storageBucket: "codecamp-null.appspot.com",
  messagingSenderId: "696029080367",
  appId: "1:696029080367:web:4ffb1539018d3d90bbcfda"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// ///////////// 끝 /////////////