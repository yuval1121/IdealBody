import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Surface, Text } from 'react-native-paper';
import { z } from 'zod';
import { updateUserData } from '../../api/user';
import { TextInput } from '../../components/Form/TextInput';
import { calculateBMI } from '../../utils/calculations';
import { getTodaysTimestamp } from '../../utils/dates';

const schema = z.object({
  height: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(0.5).max(2.5)),
  weight: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(10).max(300)),
});

type Inputs = z.infer<typeof schema>;

const WorkoutScreen = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const saveHandler: SubmitHandler<Inputs> = async ({ weight, height }) => {
    try {
      const timestamp = getTodaysTimestamp();

      await updateUserData({
        weight,
        height,
        BMI: calculateBMI(height, weight),
        water: 2,
        caloriesIn: 1884,
        caloriesOut: 664,
        timestamp,
      });
    } catch (e) {
      console.log(e);
    } finally {
      hideModal();
    }
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.innerModal}
        >
          <Surface style={styles.surface}>
            <Text>Enter Current Weight</Text>
            <TextInput
              keyboardType="number-pad"
              name="weight"
              control={control}
            />
            <Text>Enter Current Height</Text>
            <TextInput
              keyboardType="number-pad"
              name="height"
              control={control}
            />
            <Button onPress={handleSubmit(saveHandler)}>Save</Button>
          </Surface>
        </Modal>
      </Portal>
      <Button mode="contained" onPress={showModal}>
        Add data
      </Button>
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerModal: {
    alignItems: 'center',
  },
  surface: {
    width: '80%',
  },
});
