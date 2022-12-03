import { StyleSheet, View } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { TextInput } from '../components/Form/TextInput';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { useState } from 'react';

const RegisterScreen = () => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(curr => !curr);
  };

  return (
    <View style={[styles.outerContainer, { backgroundColor: colors.primary }]}>
      <Card style={styles.card}>
        <TextInput label="Name" />
        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          right={
            <TextInputPaper.Icon
              icon={showPassword ? 'eye' : 'eye-off-outline'}
              iconColor={colors.primary}
              forceTextInputFocus={false}
              onPress={handleShowPassword}
            />
          }
        />
        <TextInput
          label="Confirm Password"
          autoCapitalize="none"
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInputPaper.Icon
              icon={showConfirmPassword ? 'eye' : 'eye-off-outline'}
              iconColor={colors.primary}
              forceTextInputFocus={false}
              onPress={handleShowConfirmPassword}
            />
          }
        />
        <TextInput label="Phone Number" keyboardType="phone-pad" />
        <Button style={styles.button} mode="contained">
          Register
        </Button>
      </Card>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  outerContainer: {
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
});
