import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { LoginScreenProp } from '../navigation/types';
import { useAuthStore } from '../store/authStore';
import { TextInput } from '../components/Form/TextInput';

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<LoginScreenProp>();
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);

  return (
    <SafeAreaView
      style={[styles.content, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.view}>
        <Card>
          <Card.Content>
            <TextInput
              autoCapitalize="none"
              label="Email"
              keyboardType="email-address"
            />
            <TextInput label="Password" secureTextEntry={true} />
            <Button uppercase={false} style={styles.cardButton}>
              Forgot email/password
            </Button>
            <Button
              onPress={() => setIsLoggedIn(true)}
              mode="contained"
              style={styles.cardButton}
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
