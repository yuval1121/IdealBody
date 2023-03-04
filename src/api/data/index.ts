import { PROJECT_ID } from '@env';
import axios from 'axios';
import { userData } from './types';

export const geteUserData = async ({ email, token }: userData) => {
  const response = await axios.get<userData>(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const { data } = response;
  return data;
};

export const createUserData = async ({
  weight,
  height,
  email,
  token,
}: userData) => {
  const response = await axios.post<userData>(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users?documentId=${email}`,
    {
      fields: {
        currWeight: { doubleValue: weight },
        currHeight: { doubleValue: height },
        // BMIData: { arrayValue: [{ stringValue: 'Test' }] },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const { data } = response;
  return data;
};

export const updateUserData = async ({
  weight,
  height,
  email,
  token,
}: userData) => {
  const response = await axios.patch<userData>(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${email}`,
    {
      fields: {
        currWeight: { doubleValue: weight },
        currHeight: { doubleValue: height },
        // BMIData: { arrayValue: [{ stringValue: 'Test' }] },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const { data } = response;
  return data;
};
