import { getDoc, updateDoc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { upsertUserHistoryData } from './dataHistory';
import { getUserDocRef } from './refs';
import { UserDocument } from './types';

export const getUserData = async () => {
  const userRef = getUserDocRef();
  const userSnap = await getDoc(userRef);
  return userSnap.data();
};

export const createUserData = async ({
  weight,
  height,
  timestamp,
}: UserDocument) => {
  const userRef = getUserDocRef();

  await setDoc(userRef, {
    BMI: 0,
    weight: weight,
    height: height,
    water: 0,
    caloriesIn: 0,
    caloriesOut: 0,
    timestamp,
  });
  await upsertUserHistoryData({
    BMI: 0,
    weight: weight,
    height: height,
    water: 0,
    caloriesIn: 0,
    caloriesOut: 0,
    timestamp,
  });
};

export const updateUserData = async (
  data: Partial<UserDocument> & Pick<UserDocument, 'timestamp'>
) => {
  const userRef = getUserDocRef();
  await updateDoc(userRef, data);
  await upsertUserHistoryData(data);
};
