import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Card from '../components/Elements/Card';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card
        header="Body Composition"
        texts={[
          ['Weight', '82kgs'],
          ['BMI', '25.3'],
        ]}
        graphButton={() => <Button mode="contained">Graph</Button>}
        recordButton={() => <Button>Record</Button>}
      />
      <Card
        header="Water"
        texts={[['Glasses', '2']]}
        recordButton={() => <Button>Record</Button>}
      />
      <Card
        header="Calories"
        texts={[['Intake', '1884cal']]}
        recordButton={() => <Button>Record</Button>}
      />
      <Card
        header="Exercise"
        texts={[['Calories Burned', '664cal']]}
        recordButton={() => <Button>Record</Button>}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    rowGap: 60,
    marginVertical: '15%',
  },
});
