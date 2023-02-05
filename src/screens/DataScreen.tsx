import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { z } from 'zod';
import { TextInput } from '../components/Form/TextInput';

const schema = z.object({
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

  const saveHandler = () => {
    console.log('saving modal...');
    hideModal();
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
          <Button onPress={saveHandler}>Save</Button>
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

// const getStyles = (height: number, width: number) => StyleSheet.create({
//     container: {
//     alignItems: 'center',
//     // backgroundColor: 'white',
//     flex: 1,
//     justifyContent: 'center',
//   }
// });

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
