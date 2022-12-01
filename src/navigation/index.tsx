import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../../constants/combinedThemes';
import HomeStackNavigator from './HomeStackNavigator';

const RootNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
