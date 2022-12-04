import { StyleSheet, View } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { TextInput } from '../components/Form/TextInput';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { useState } from 'react';
import { createUser } from '../api/auth/auth';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email('Email required'),
  password: z.string().min(6),
});

type Inputs = z.infer<typeof schema>;

const RegisterScreen = () => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const handleRegister: SubmitHandler<Inputs> = async ({ email, password }) => {
    await createUser(email, password);
  };

  return (
    <View style={[styles.outerContainer, { backgroundColor: colors.primary }]}>
      <Card style={styles.card}>
        <Controller
          control={control}
          name="name"
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
          onPress={handleSubmit(handleRegister)}
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
