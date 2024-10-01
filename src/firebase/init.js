  import { initializeApp } from "firebase/app";
  import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHxVjWKfDN0-DAoiVQYiRQqbQ5Rpg7yZ4",
  authDomain: "week7-saran.firebaseapp.com",
  projectId: "week7-saran",
  storageBucket: "week7-saran.appspot.com",
  messagingSenderId: "520315553807",
  appId: "1:520315553807:web:cca2183cf1f164dc13bb7a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export { db };