import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../constants/combinedThemes';
import { useAuthStore } from '../store/authStore';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';

const RootNavigator = () => {
  const colorScheme = useColorScheme();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      {isLoggedIn ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
