import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Hello</Text>
        <Button onPress={() => console.log('clicked')}>
          <Text>Press me</Text>
          test
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
});
