import { SafeAreaView, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

const RegisterScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar>
          <Appbar.BackAction />
          <Appbar.Content title="Register"></Appbar.Content>
        </Appbar>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
