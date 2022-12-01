import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../constants/combinedThemes';
import AuthStack from './AuthStack';

const RootNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      <AuthStack />
    </NavigationContainer>
  );
};

export default RootNavigator;
