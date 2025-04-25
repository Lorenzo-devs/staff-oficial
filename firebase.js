import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  // Você precisará substituir estas configurações com as do seu projeto Firebase
  apiKey: "AIzaSyAht04T5MgpzVBvLQSGMmdhWzHkjVDFqoo",
  authDomain: "planilha-766e4.firebaseapp.com",
  projectId: "planilha-766e4",
  storageBucket: "planilha-766e4.firebasestorage.app",
  messagingSenderId: "180186967110",
  appId: "1:180186967110:web:8e8789be30ec7bcbe3ee47",
  databaseURL: `https://planilha-766e4.firebaseio.com`
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Habilita persistência multi-tab
enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        // Múltiplas abas abertas, persistência pode funcionar apenas em uma aba por vez
        console.warn('Persistência falhou - múltiplas abas abertas');
    } else if (err.code === 'unimplemented') {
        // O navegador não suporta persistência
        console.warn('Persistência não suportada neste navegador');
    }
});

// Inicializa o Auth
const auth = getAuth(app);

// Função para verificar o status da conexão
const checkConnection = () => {
    const connectedRef = db.collection('info/connected');
    connectedRef.onSnapshot((snap) => {
        if (snap.data()?.connected === true) {
            console.log('Conectado ao Firestore');
        } else {
            console.log('Desconectado do Firestore');
        }
    }, (error) => {
        console.error('Erro ao monitorar conexão:', error);
    });
};

// Exporta as instâncias e funções
export { db, auth, checkConnection }; 