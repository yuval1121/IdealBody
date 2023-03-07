import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
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
  const [isInItializing, setIsInitalizing] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setIsInitalizing(false);
    });

    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInItializing)
    return (
      <View style={{ flex: 1 }}>
        <Button style={{ justifyContent: 'center', alignItems: 'center' }}>
          Loading...
        </Button>
      </View>
    );

  return (
    <NavigationContainer
      theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      {loggedIn ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
