import { API_TOKEN } from '@env';
import axios from 'axios';
import { userDataRequest, userDataResponse } from './types';

export const createUser = async ({ email, password }: userDataRequest) => {
  const response = await axios.post<userDataResponse>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_TOKEN}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  const { data } = response;
  return data;
};

export const signUserIn = async ({ email, password }: userDataRequest) => {
  const response = await axios.post<userDataResponse>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_TOKEN}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  const { data } = response;
  return data;
};
