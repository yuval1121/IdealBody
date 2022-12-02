import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../constants/combinedThemes';
import { useAuthStore } from '../store/authStore';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';

interface Props {
  isDarkMode: boolean;
}

const RootNavigator = ({ isDarkMode }: Props) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <NavigationContainer
      theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      {isLoggedIn ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
