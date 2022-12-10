import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { LoginScreenProp } from '../navigation/Auth/types';
import { useAuthStore } from '../store/authStore';
import { TextInput } from '../components/Form/TextInput';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { useState } from 'react';
import { signUserIn } from '../api/auth';

const schema = z.object({
  email: z.string().email('Email required'),
  password: z.string().min(6),
});

type Inputs = z.infer<typeof schema>;

const LoginScreen = () => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<LoginScreenProp>();
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);

  const { control, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const handleSignIn: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const res = await signUserIn({ email, password });
      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.view}>
        <Card>
          <Card.Content>
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
                  icon={!showPassword ? 'eye' : 'eye-off-outline'}
                  iconColor={
                    formState.errors.password ? colors.error : colors.primary
                  }
                  forceTextInputFocus={false}
                  onPress={handleShowPassword}
                />
              }
            />

            <Button uppercase={false} style={styles.cardButton}>
              Forgot email/password
            </Button>
            <Button
              onPress={handleSubmit(handleSignIn)}
              mode="contained"
              style={styles.cardButton}
              testID="loginButton"
            >
              Login
            </Button>
            <Button
              onPress={() => navigation.navigate('Register')}
              style={styles.cardButton}
            >
              Register
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    width: '80%',
  },
  cardButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
});
