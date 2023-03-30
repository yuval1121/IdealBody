import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  Recover: undefined;
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
