import { NavigationContainer } from '@react-navigation/native';
import Spinner from '../components/Elements/Spinner';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../constants/combinedThemes';
import useAuth from '../hooks/useAuth';
import BottomTabs from './App/BottomTabs';
import AuthStack from './Auth/AuthStack';

interface Props {
  isDarkMode: boolean;
}

const RootNavigator = ({ isDarkMode }: Props) => {
  const { loggedIn, initializing } = useAuth();

  if (initializing) return <Spinner />;

  return (
    <NavigationContainer
      theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      {loggedIn ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
