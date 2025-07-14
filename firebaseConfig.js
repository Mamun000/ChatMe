import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import from 'firebase/auth/react-native' for React Native support
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAwWFvLg-265AfsEgZfPm976uOKpvfpEOg',
  authDomain: 'chat-me-1142d.firebaseapp.com',
  projectId: 'chat-me-1142d',
  storageBucket: 'chat-me-1142d.appspot.com',
  messagingSenderId: '568153531874',
  appId: '1:568153531874:web:3b0e2222bc9d6b1e3c05bb',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');