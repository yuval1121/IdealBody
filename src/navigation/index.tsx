import { NavigationContainer } from '@react-navigation/native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../constants/combinedThemes';
import { useAuthStore } from '../store/authStore';
import AuthStack from './Auth/AuthStack';
import BottomTabs from './App/BottomTabs';

interface Props {
  isDarkMode: boolean;
}

const RootNavigator = ({ isDarkMode }: Props) => {
  const isLoggedIn = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer
      theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      {isLoggedIn ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
