import {
  API_TOKEN,
  APPID,
  DATABASEURL,
  MESSAGINGSENDERID,
  PROJECT_ID,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: API_TOKEN,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: DATABASEURL,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
