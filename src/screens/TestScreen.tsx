import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';

const TestScreen = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { height, width } = useWindowDimensions();
  const innerModalDim = { height: height / 3, width: width / 1.5 };

  const saveHandler = () => {
    console.log('saving modal...');
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
          <Text>Test</Text>
          <Button onPress={saveHandler}>Save</Button>
        </Modal>
      </Portal>
      <Text testID="txt">Test</Text>
      <Button mode="contained" onPress={showModal}>
        Add data
      </Button>
    </View>
  );
};

export default TestScreen;

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
