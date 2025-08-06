import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB1vxh7shJcrNiDHqZy07qN3IqQps5PpuA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "study-reboot.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "study-reboot",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "study-reboot.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1017200029815",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1017200029815:web:a4983fbb768cdb8bdf9672"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Authentication y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
