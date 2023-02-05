import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { z } from 'zod';
import { TextInput } from '../components/Form/TextInput';

const schema = z.object({
  height: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(0.5).max(2.5)),
  weight: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(10).max(300)),
});

type Inputs = z.infer<typeof schema>;

const HomeScreen = () => {
  const [BMI, setBMI] = useState<number | null>(null);
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const handleCalculateBMI: SubmitHandler<Inputs> = ({ height, weight }) => {
    setBMI(parseFloat((weight / height ** 2).toFixed(3)));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TextInput
          name="height"
          control={control}
          label="Height"
          keyboardType="number-pad"
          errorIcon="alert-circle"
        />

        <TextInput
          name="weight"
          control={control}
          label="Weight"
          keyboardType="number-pad"
          errorIcon="alert-circle"
        />

        <Button
          onPress={handleSubmit(handleCalculateBMI)}
          style={styles.button}
          mode="contained"
        >
          Calculate
        </Button>

        {BMI !== null && <Text style={styles.text}>BMI is {BMI}</Text>}
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
  button: {
    width: '80%',
    alignSelf: 'center',
    margin: 15,
  },
  text: {
    textAlign: 'center',
  },
});
