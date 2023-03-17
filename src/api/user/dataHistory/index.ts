import { getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { UserDocument } from '../types';
import { getDataHistoryCollectionRef, getDataHistoryDocRef } from './refs';

export const upsertUserHistoryData = async (data: UserDocument) => {
  const collectionRef = getDataHistoryCollectionRef();
  const docRef = getDataHistoryDocRef(data.timestamp);

  const q = query(collectionRef, where('timestamp', '==', data.timestamp));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size === 0) {
    await setDoc(docRef, data, { merge: true });
  } else {
    querySnapshot.forEach(doc => {
      updateDoc(doc.ref, data).catch(e => console.log(e));
    });
  }
};
