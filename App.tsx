import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/constants/combinedThemes';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <>
      <PaperProvider
        theme={
          colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
        }
      >
        <RootNavigator />
        <StatusBar style="auto" />
      </PaperProvider>
    </>
  );
}
