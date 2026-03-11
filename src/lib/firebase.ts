//Firebase configuration and initialization
//Sets up Firebase authentication and Firestore database so other parts of the app can access them

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID",
};

//Initialize the Firebase application
const app = initializeApp(firebaseConfig);

//Firebase Authentication service
export const auth = getAuth(app);

//Firebase Authentication service
export const db = getFirestore(app);