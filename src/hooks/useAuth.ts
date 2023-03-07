import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initializing, setInitalizing] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInitalizing(false);
    });

    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loggedIn, initializing };
};

export default useAuth;
