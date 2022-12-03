import { StyleSheet, View, Text } from 'react-native';
import { Button, Card, useTheme, Tooltip } from 'react-native-paper';
import { TextInput } from '../components/Form/TextInput';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { useState } from 'react';
import { createUser } from '../api/auth/auth';
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';

interface Inputs extends FieldValues {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen = () => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState } = useForm<Inputs>();
  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const registerHandler: SubmitHandler<Inputs> = async ({
    email,
    password,
  }) => {
    const res = await createUser(email, password);
    console.log(res);
  };

  return (
    <View style={[styles.outerContainer, { backgroundColor: colors.primary }]}>
      <Card style={styles.card}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Email is required' }}
          render={({ field, fieldState }) => (
            <TextInput
              error={fieldState.error ? true : false}
              label="Name"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              right={
                fieldState.error && (
                  <TextInputPaper.Icon
                    icon="alert-circle"
                    iconColor={colors.error}
                    forceTextInputFocus={false}
                  />
                )
              }
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{ required: 'Email is required' }}
          render={({ field, fieldState }) => (
            <TextInput
              error={fieldState.error ? true : false}
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              right={
                fieldState.error && (
                  <TextInputPaper.Icon
                    icon="alert-circle"
                    iconColor={colors.error}
                    forceTextInputFocus={false}
                  />
                )
              }
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required', minLength: 6 }}
          render={({ field, fieldState }) => (
            <TextInput
              error={fieldState.error ? true : false}
              label="Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              right={
                <TextInputPaper.Icon
                  icon={showPassword ? 'eye' : 'eye-off-outline'}
                  iconColor={fieldState.error ? colors.error : colors.primary}
                  forceTextInputFocus={false}
                  onPress={handleShowPassword}
                />
              }
            />
          )}
        />

        <Button
          onPress={handleSubmit(registerHandler)}
          style={styles.button}
          mode="contained"
        >
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
