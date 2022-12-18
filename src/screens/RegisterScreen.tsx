import { StyleSheet, View } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { TextInput } from '../components/Form/TextInput';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { useState } from 'react';
import { createUser } from '../api/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { RegisterScreenProp } from '../navigation/Auth/types';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email('Email required'),
  password: z.string().min(6),
});

type Inputs = z.infer<typeof schema>;

const RegisterScreen = () => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigation<RegisterScreenProp>();

  const { control, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const handleRegister: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await createUser({ email, password });
      navigator.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TextInput
          name="name"
          control={control}
          label="Name"
          errorIcon="alert-circle"
        />

        <TextInput
          name="email"
          control={control}
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          errorIcon="alert-circle"
        />

        <TextInput
          name="password"
          control={control}
          label="Password"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          right={
            <TextInputPaper.Icon
              icon={showPassword ? 'eye' : 'eye-off-outline'}
              iconColor={
                formState.errors.password ? colors.error : colors.primary
              }
              forceTextInputFocus={false}
              onPress={handleShowPassword}
            />
          }
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
  container: {
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
