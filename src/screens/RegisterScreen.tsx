import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { TextInput } from '../components/Form/TextInput';
import { TextInput as TextInputPaper } from 'react-native-paper';

const RegisterScreen = () => {
  const { colors } = useTheme();
  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <TextInput label="Name" />
        <TextInput
          autoCapitalize="none"
          label="Email"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          secureTextEntry={true}
          right={
            <TextInputPaper.Icon
              icon="eye-off-outline"
              iconColor={colors.primary}
            />
          }
        />
        <TextInput
          label="Confirm Password"
          secureTextEntry={true}
          right={
            <TextInputPaper.Icon
              icon="eye-off-outline"
              iconColor={colors.primary}
            />
          }
        />
        <TextInput label="Phone Number" keyboardType="phone-pad" />
        <Button style={styles.button} mode="contained">
          Register
        </Button>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    margin: 15,
  },
});
