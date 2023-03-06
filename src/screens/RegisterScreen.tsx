import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  TextInput as TextInputPaper,
  useTheme,
} from 'react-native-paper';
import { z } from 'zod';
import { createUser } from '../api/auth';
import { createUserData } from '../api/user';
import { TextInput } from '../components/Form/TextInput';
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
      await createUserData({ weight: 0, height: 0 });
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
