import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const LoadingLayout = () => {
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>;
};

export default LoadingLayout;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
