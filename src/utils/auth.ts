import { getAuth, User } from 'firebase/auth';

export const getCurrentUser = (): User => {
  const { currentUser } = getAuth();

  if (!currentUser) {
    throw new Error('No user logged in');
  }

  return currentUser;
};
