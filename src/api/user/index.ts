import { arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { getCurrentUser } from '../../utils/auth';
import { calculateBMI } from '../../utils/calculations';
import { db } from '../../utils/config/firebase';
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
  const docRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );
  await setDoc(docRef, {
    currBMI: 0,
    currWeight: weight,
    currHeight: height,
    currWater: 0,
    currCaloriesIn: 0,
    currCaloriesOut: 0,
    DataHistory: [],
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
  const timestamp = new Date();
  timestamp.setUTCHours(0, 0, 0, 0);
  const docRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );

  await updateDoc(docRef, {
    currWeight: weight,
    currHeight: height,
    currWater: water,
    currCaloriesIn: caloriesIn,
    currCaloriesOut: caloriesOut,
    currBMI: calculateBMI(height, weight),
    DataHistory: arrayUnion({
      BMI: calculateBMI(height, weight),
      weight,
      height,
      water,
      caloriesIn,
      caloriesOut,
      timestamp,
    }),
  });
};

export const resetUserData = async ({ weight, height }: UserData) => {
  const user = getCurrentUser();
  const docRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );
  await setDoc(docRef, {
    currBMI: 0,
    currWeight: weight,
    currHeight: height,
    currWater: 0,
    currCaloriesIn: 0,
    currCaloriesOut: 0,
  });
};
