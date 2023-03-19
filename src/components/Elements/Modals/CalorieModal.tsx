import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button, Modal, Portal, Surface, Text } from 'react-native-paper';
import { z } from 'zod';
import { updateUserData } from '../../../api/user';
import { getTodaysTimestamp } from '../../../utils/dates';
import { TextInput } from '../../Form/TextInput';

const schema = z.object({
  calories: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(1)),
});

type Inputs = z.infer<typeof schema>;

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieModal = ({ visible, setVisible }: Props) => {
  const hideModal = () => setVisible(false);
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const saveHandler: SubmitHandler<Inputs> = async ({
    calories: caloriesIn,
  }) => {
    try {
      const timestamp = getTodaysTimestamp();

      await updateUserData({
        caloriesIn,
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
          <Text>Enter Current Calories</Text>
          <TextInput
            keyboardType="number-pad"
            name="calories"
            control={control}
          />

          <Button onPress={handleSubmit(saveHandler)}>Save</Button>
        </Surface>
      </Modal>
    </Portal>
  );
};

export default CalorieModal;

const styles = StyleSheet.create({
  innerModal: {
    alignItems: 'center',
  },
  surface: {
    width: '80%',
  },
});
