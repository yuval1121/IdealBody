import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text>HomeScreen</Text>
      </Card>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
  },
});
