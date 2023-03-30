import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Auth/LoginScreen';
import LostPasswordScreen from '../../screens/Auth/LostPasswordScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen';
import { AuthStackNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStack = () => {
  // Screen only needs SafeAreaView if headerShown is set to false
  return (
    <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Recover" component={LostPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
