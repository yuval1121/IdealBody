import '@firebase/firestore';
import { arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { db } from '../../utils/config/firebase';
import { UserData, UserModelData } from './types';

export const getUser = async () => {
  const { currentUser } = getAuth();

  if (currentUser) {
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as UserModelData;
  }
};

export const createUserData = async ({ weight, height }: UserData) => {
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

export const updateUserData = async ({ weight, height }: UserData) => {
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
