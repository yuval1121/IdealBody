import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { z } from 'zod';
import { resetPassword } from '../../api/auth';
import { TextInput } from '../../components/Form/TextInput';

const schema = z.object({
  email: z.string().email('Email required'),
});

type Inputs = z.infer<typeof schema>;

const LostPasswordScreen = () => {
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const handleRecoverPassword: SubmitHandler<Inputs> = async ({ email }) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.log(error);
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

            <Button
              onPress={handleSubmit(handleRecoverPassword)}
              mode="contained"
              style={styles.cardButton}
              testID="loginButton"
            >
              Recover
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default LostPasswordScreen;

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
    marginTop: '10%',
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
});
