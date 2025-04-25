import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Você precisará substituir estas configurações com as do seu projeto Firebase
  apiKey: "AIzaSyAht04T5MgpzVBvLQSGMmdhWzHkjVDFqoo",
  authDomain: "planilha-766e4.firebaseapp.com",
  projectId: "planilha-766e4",
  storageBucket: "planilha-766e4.firebasestorage.app",
  messagingSenderId: "180186967110",
  appId: "1:180186967110:web:8e8789be30ec7bcbe3ee47"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore com configurações otimizadas
const db = getFirestore(app);

// Inicializa o Auth
const auth = getAuth(app);

export { db, auth }; 