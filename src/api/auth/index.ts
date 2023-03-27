import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { UserAuth } from './types';

export const createUser = async ({ email, password }: UserAuth) => {
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const signUserIn = async ({ email, password }: UserAuth) => {
  const auth = getAuth();
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const resetPassword = async (email: string) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
};
