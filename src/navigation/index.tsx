import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../constants/combinedThemes';
import BottomTabs from './App/BottomTabs';
import AuthStack from './Auth/AuthStack';

interface Props {
  isDarkMode: boolean;
}

const RootNavigator = ({ isDarkMode }: Props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return subscriber;
  }, [auth]);

  return (
    <NavigationContainer
      theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      {loggedIn ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
