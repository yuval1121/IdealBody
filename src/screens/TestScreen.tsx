import { Text, View, StyleSheet } from 'react-native';

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
});
