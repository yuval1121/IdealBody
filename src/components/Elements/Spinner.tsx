import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {
  centered?: boolean;
}

const Spinner = ({ centered }: Props) => {
  return (
    <ActivityIndicator
      testID="Loading"
      size="large"
      style={centered ? styles.centered : styles.middle}
    />
  );
};

export default Spinner;

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
