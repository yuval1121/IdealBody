import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { z } from 'zod';
import { addUserData } from '../api/data';
import { TextInput } from '../components/Form/TextInput';
import { useAuthStore } from '../store/authStore';

const schema = z.object({
  height: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(0.5).max(2.5)),
  weight: z.preprocess(arg => {
    if (typeof arg === 'string') return parseFloat(arg);
  }, z.number().min(10).max(300)),
});

type Inputs = z.infer<typeof schema>;

const DataScreen = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { height, width } = useWindowDimensions();
  const innerModalDim = { height: height / 3, width: width / 1.5 };
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const email = useAuthStore(state => state.email);
  const token = useAuthStore(state => state.token);

  const saveHandler: SubmitHandler<Inputs> = async ({ weight, height }) => {
    try {
      const res = await addUserData({ weight, height, email, token });
      console.log(res);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response);
      }
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
          contentContainerStyle={[styles.innerModal, innerModalDim]}
          style={styles.outerModal}
        >
          <Text>Enter Current Weight</Text>
          <TextInput name="weight" control={control} />
          <Text>Enter Current Height</Text>
          <TextInput name="height" control={control} />
          <Button onPress={handleSubmit(saveHandler)}>Save</Button>
        </Modal>
      </Portal>
      <Text>Test</Text>
      <Button mode="contained" onPress={showModal}>
        Add data
      </Button>
    </View>
  );
};

export default DataScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  outerModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModal: {
    backgroundColor: 'white',
    ustifyContent: 'flex-start',
  },
  // text: {
  //   textAlign: 'center',
  // },
  // confirmButton: {
  //   marginTop: 'auto',
  // },
});
