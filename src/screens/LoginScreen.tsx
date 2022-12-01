import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, TextInput, useTheme } from 'react-native-paper';
import { useAuthStore } from '../store/authStore';

const LoginScreen = () => {
  const theme = useTheme();
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);

  return (
    <SafeAreaView
      style={[styles.content, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.view}>
        <Card>
          <Card.Title title="IdealBody"></Card.Title>
          <Card.Content>
            <TextInput
              style={styles.textInput}
              label="Email"
              keyboardType="email-address"
            ></TextInput>
            <TextInput
              style={styles.textInput}
              label="Password"
              secureTextEntry={true}
            ></TextInput>
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
            <Button style={styles.cardButton}>Register</Button>
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
    flexDirection: 'row',
  },
  view: {
    width: '80%',
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  cardButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
});
