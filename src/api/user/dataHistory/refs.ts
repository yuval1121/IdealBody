import { collection, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { getCurrentUser } from '../../../utils/auth';
import universalConverter from '../../../utils/converter';
import { UserDocument } from '../types';

export const getDataHistoryCollectionRef = () => {
  const user = getCurrentUser();
  const dataHistoryCollectionRef = collection(
    db,
    'users',
    user.uid,
    'DataHistory'
  ).withConverter(universalConverter<UserDocument>());
  return dataHistoryCollectionRef;
};

export const getDataHistoryDocRef = (timestamp: Date) => {
  const user = getCurrentUser();
  const timestampKey = timestamp.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dataHistoryRef = doc(
    db,
    'users',
    user.uid,
    'DataHistory',
    timestampKey
  ).withConverter(universalConverter<UserDocument>());
  return dataHistoryRef;
};
