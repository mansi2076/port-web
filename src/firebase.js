// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Add if using authentication

const firebaseConfig = {
  apiKey: "AIzaSyApPIx2yVmex-GUarGh0mNxigPrl3QcBus",
  authDomain: "portfolio-c5850.firebaseapp.com",
  projectId: "portfolio-c5850",
  storageBucket: "portfolio-c5850.firebasestorage.app",
  messagingSenderId: "671415714717",
  appId: "1:671415714717:web:fc18fb574ec77a5b096574",
  databaseURL: "https://portfolio-c5850-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getDatabase(app);
const auth = getAuth(app); // Add if using authentication

// Export the services
export { app, db, auth };