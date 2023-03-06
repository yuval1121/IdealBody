import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { userDataRequest } from './types';

export const createUser = async ({ email, password }: userDataRequest) => {
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const signUserIn = async ({ email, password }: userDataRequest) => {
  const auth = getAuth();
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};
