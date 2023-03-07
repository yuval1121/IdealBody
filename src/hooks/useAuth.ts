import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initializing, setInitalizing] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInitalizing(false);
    });

    return unsubscribe;
  }, []);

  return { loggedIn, initializing };
};

export default useAuth;
