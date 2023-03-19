import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button, Modal, Portal, Surface, Text } from 'react-native-paper';
import { z } from 'zod';
import { updateUserData } from '../../../api/user';
import { calculateBMI } from '../../../utils/calculations';
import { getTodaysTimestamp } from '../../../utils/dates';
import { TextInput } from '../../Form/TextInput';

const schema = z.object({
  height: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(0.5).max(2.5)),
  weight: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(10).max(300)),
});

type Inputs = z.infer<typeof schema>;

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyCompModal = ({ visible, setVisible }: Props) => {
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
        timestamp,
      });
    } catch (e) {
      console.log(e);
    } finally {
      hideModal();
    }
  };

  return (
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
  );
};

export default BodyCompModal;

const styles = StyleSheet.create({
  innerModal: {
    alignItems: 'center',
  },
  surface: {
    width: '80%',
  },
});
