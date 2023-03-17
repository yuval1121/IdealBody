import { getAuth } from 'firebase/auth';

export const getCurrentUser = () => {
  const { currentUser } = getAuth();

  if (!currentUser) {
    throw new Error('No user logged in');
  }

  return currentUser;
};
