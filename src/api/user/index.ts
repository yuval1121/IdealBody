import { arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { getCurrentUser } from '../../utils/auth';
import { calculateBMI } from '../../utils/calculations';
import { db } from '../../utils/config/firebase';
import universalConverter from '../../utils/converters';
import { UserData, UserModelData } from './types';

export const getUser = async () => {
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
    BMI: 0,
    currWeight: weight,
    currHeight: height,
    BMIData: [],
  });
};

export const updateUserData = async ({ weight, height }: UserData) => {
  const user = getCurrentUser();
  const timestamp = new Date();
  timestamp.setUTCHours(0, 0, 0, 0);
  const docRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );

  await updateDoc(docRef, {
    currWeight: weight,
    currHeight: height,
    BMIData: arrayUnion({
      BMI: calculateBMI(height, weight),
      weight,
      height,
      timestamp,
    }),
  });
};
