import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
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

// Inicializa o Firestore
const db = getFirestore(app);

// Habilita persistência offline e sincronização em tempo real
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Múltiplas abas abertas, persistência pode funcionar apenas em uma aba por vez');
    } else if (err.code == 'unimplemented') {
      console.log('O navegador não suporta persistência');
    }
  });

// Inicializa o Auth
const auth = getAuth(app);

export { db, auth }; 