import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type AuthStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
};

export type LoginScreenProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Login'
>;

export type RegisterScreenProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Register'
>;

export type LoginScreenRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  'Login'
>;
