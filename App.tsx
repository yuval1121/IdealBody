import { StatusBar } from 'expo-status-bar';
import { I18nManager, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/constants/combinedThemes';
import RootNavigator from './src/navigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  I18nManager.allowRTL(false);

  return (
    <>
      <PaperProvider
        theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
      >
        <RootNavigator isDarkMode={isDarkMode} />
        <StatusBar style="auto" />
      </PaperProvider>
    </>
  );
}
