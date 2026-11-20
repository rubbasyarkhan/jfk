import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyAZAHzLz7YT7JKQDcTPQ1UUa_EsG5M6KTM',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'jfk-liquors.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'jfk-liquors',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'jfk-liquors.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '149865678473',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:149865678473:web:91b693619e68db5087a858',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-5XS4ZW036T',
};

let app: FirebaseApp | undefined;
let db: Firestore | any = null;
let storage: FirebaseStorage | any = null;
let auth: Auth | any = null;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
  } catch (err) {
    console.warn('Firebase initialized in fallback mode:', err);
  }
}

export { app, db, storage, auth };
export default app;
