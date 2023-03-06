import '@firebase/firestore';
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { db } from '../../utils/config/firebase';
import { userData } from './types';

export const getUser = async () => {
  const docRef = doc(db, 'users', 'c@c.com');
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const createUserData = async ({ weight, height }: userData) => {
  const { currentUser } = getAuth();

  if (currentUser) {
    const docRef = doc(db, 'users', currentUser.uid);
    await setDoc(docRef, {
      currWeight: weight,
      currHeight: height,
      BMIData: [],
    });
  }
};

export const updateUserData = async ({ weight, height }: userData) => {
  const { currentUser } = getAuth();

  if (currentUser) {
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      currWeight: weight,
      currHeight: height,
      BMIData: arrayUnion({
        weight: weight,
        timestamp: new Date(),
      }),
    });
  }
};
