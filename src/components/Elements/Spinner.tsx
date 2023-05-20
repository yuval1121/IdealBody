import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Spinner = () => {
  return <ActivityIndicator size="large" style={styles.spinner} />;
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
