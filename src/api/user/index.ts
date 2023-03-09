import { arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { getCurrentUser } from '../../utils/auth';
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
    currWeight: weight,
    currHeight: height,
    BMIData: [],
  });
};

export const updateUserData = async ({ weight, height }: UserData) => {
  const user = getCurrentUser();
  const docRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserModelData>()
  );
  await updateDoc(docRef, {
    currWeight: weight,
    currHeight: height,
    BMIData: arrayUnion({
      weight: weight,
      timestamp: new Date(),
    }),
  });
};
