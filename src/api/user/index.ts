import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getCurrentUser } from '../../utils/auth';
import universalConverter from '../../utils/converter';
import { UserData, UserModelData } from './types';

export const getUserRef = () => {
  const user = getCurrentUser();
  const userRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );
  return userRef;
};

export const getUserData = async () => {
  const userRef = getUserRef();
  const userSnap = await getDoc(userRef);
  return userSnap.data();
};

export const createUserData = async ({ weight, height }: UserData) => {
  const userRef = getUserRef();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);

  await setDoc(userRef, {
    current: {
      BMI: 0,
      weight: weight,
      height: height,
      water: 0,
      caloriesIn: 0,
      caloriesOut: 0,
      timestamp,
    },
    DataHistory: {},
  });
};

export const updateUserData = async (data: UserData) => {
  const userRef = getUserRef();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);
  const timestampKey = timestamp.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  await updateDoc(userRef, {
    current: data,
    [`DataHistory.${timestampKey}`]: data,
  });
};

export const resetCurrentUserData = async () => {
  const userRef = getUserRef();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);

  await updateDoc(userRef, {
    current: {
      water: 0,
      caloriesIn: 0,
      caloriesOut: 0,
      timestamp,
    },
  });
};
