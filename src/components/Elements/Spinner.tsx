import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Spinner = () => {
  return <ActivityIndicator size="large" style={styles.spinner} />;
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
