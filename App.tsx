import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import RootNavigator from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './constants/combinedThemes';

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
    // <PaperProvider>
    //   <SafeAreaView style={{ flex: 1 }}>
    //     <View style={styles.container}>
    //       <Text>Hello</Text>
    //     </View>
    //   </SafeAreaView>
    // </PaperProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: 'white',
//     flex: 1,
//     justifyContent: 'center',
//   },
// });
