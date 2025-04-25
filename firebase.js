import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAht04T5MgpzVBvLQSGMmdhWzHkjVDFqoo",
  authDomain: "planilha-766e4.firebaseapp.com",
  projectId: "planilha-766e4",
  storageBucket: "planilha-766e4.firebasestorage.app",
  messagingSenderId: "180186967110",
  appId: "1:180186967110:web:8e8789be30ec7bcbe3ee47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }; 