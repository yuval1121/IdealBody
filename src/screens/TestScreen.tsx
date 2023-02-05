import { StyleSheet, Text, View } from 'react-native';

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text testID="txt">Test</Text>
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
