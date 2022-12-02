import { Text, View, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
});
