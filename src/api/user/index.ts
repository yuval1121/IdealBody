import { getDoc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import {
  getDataHistoryCollectionRef,
  getDataHistoryDocRef,
  getUserDocRef,
} from './refs';
import { UserDocument } from './types';

export const addUserDataHistoryData = async (data: UserDocument) => {
  const collectionRef = getDataHistoryCollectionRef();
  const docRef = getDataHistoryDocRef();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);

  const q = query(collectionRef, where('timestamp', '==', timestamp));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size === 0) {
    await setDoc(docRef, data, { merge: true });
  } else {
    querySnapshot.forEach(doc => {
      updateDoc(doc.ref, data).catch(e => console.log(e));
    });
  }
};

export const getUserData = async () => {
  const userRef = getUserDocRef();
  const userSnap = await getDoc(userRef);
  return userSnap.data();
};

export const createUserData = async ({ weight, height }: UserDocument) => {
  const userRef = getUserDocRef();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);

  await setDoc(userRef, {
    BMI: 0,
    weight: weight,
    height: height,
    water: 0,
    caloriesIn: 0,
    caloriesOut: 0,
    timestamp,
  });
};

export const updateUserData = async (data: UserDocument) => {
  const userRef = getUserDocRef();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);

  await updateDoc(userRef, { ...data, timestamp });
  await addUserDataHistoryData({ ...data, timestamp });
};

export const resetCurrentUserData = async () => {
  const userRef = getUserDocRef();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);

  await updateDoc(userRef, {
    water: 0,
    caloriesIn: 0,
    caloriesOut: 0,
    timestamp,
  });
};
