import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getCurrentUser } from '../../utils/auth';
import { calculateBMI } from '../../utils/calculations';
import universalConverter from '../../utils/converters';
import { UserData, UserModelData } from './types';

export const getUserData = async () => {
  const user = getCurrentUser();
  const docRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const createUserData = async ({ weight, height }: UserData) => {
  const user = getCurrentUser();
  const userRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );
  const timestamp = new Date();
  timestamp.setUTCHours(0, 0, 0, 0);

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

export const updateUserData = async ({
  weight,
  height,
  water,
  caloriesIn,
  caloriesOut,
}: UserData) => {
  const user = getCurrentUser();
  const userRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );

  const timestamp = new Date();
  timestamp.setUTCHours(0, 0, 0, 0);
  const timestampKey = timestamp.toLocaleDateString('en-GB', {
    timeZone: 'utc',
  });

  await updateDoc(userRef, {
    current: {
      weight: weight,
      height: height,
      water: water,
      caloriesIn: caloriesIn,
      caloriesOut: caloriesOut,
      BMI: calculateBMI(height, weight),
      timestamp,
    },
    DataHistory: {
      [timestampKey]: {
        BMI: calculateBMI(height, weight),
        weight,
        height,
        water,
        caloriesIn,
        caloriesOut,
        timestamp,
      },
    },
  });
};

export const resetCurrentUserData = async () => {
  const user = getCurrentUser();
  const userRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );
  const timestamp = new Date();
  timestamp.setUTCHours(0, 0, 0, 0);

  await updateDoc(userRef, {
    current: {
      water: 0,
      caloriesIn: 0,
      caloriesOut: 0,
      timestamp,
    },
  });
};
