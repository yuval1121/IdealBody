import dayjs from 'dayjs';
import {
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { UserDocument } from '../types';
import { getDataHistoryCollectionRef, getDataHistoryDocRef } from './refs';

export const upsertUserHistoryData = async (data: UserDocument) => {
  const collectionRef = getDataHistoryCollectionRef();
  const docRef = getDataHistoryDocRef(data.timestamp);

  const q = query(collectionRef, where('timestamp', '==', data.timestamp));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await setDoc(docRef, data, { merge: true });
  } else {
    querySnapshot.forEach(doc => {
      updateDoc(doc.ref, data).catch(e => console.log(e));
    });
  }
};

export const getLast6Days = async (timestamp: Date) => {
  const collectionRef = getDataHistoryCollectionRef();
  const startDate = dayjs().subtract(6, 'd').toDate();

  const q = query(
    collectionRef,
    where('timestamp', '<=', timestamp),
    where('timestamp', '>', startDate),
    limit(6)
  );
  const querySnapshot = await getDocs(q);
  const data: UserDocument[] = [];

  querySnapshot.forEach(doc => {
    data.push(doc.data());
  });

  return data;
};
