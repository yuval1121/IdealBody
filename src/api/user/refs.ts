import { doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getCurrentUser } from '../../utils/auth';
import universalConverter from '../../utils/converter';
import { UserDocument } from './types';

export const getUserDocRef = () => {
  const user = getCurrentUser();
  const userRef = doc(db, 'users', user.uid).withConverter(
    universalConverter<UserDocument>()
  );
  return userRef;
};
