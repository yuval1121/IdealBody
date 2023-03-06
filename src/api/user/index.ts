import { PROJECT_ID } from '@env';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { createUserData, getUserData } from './types';

export const getUser = async () => {
  const email = useAuthStore.getState().email;
  const token = useAuthStore.getState().token;
  const response = await axios.get<getUserData>(
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

export const createUser = async ({ weight, height }: createUserData) => {
  const email = useAuthStore.getState().email;
  const token = useAuthStore.getState().token;
  const response = await axios.post<createUserData>(
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

export const updateUser = async ({ weight, height }: createUserData) => {
  const email = useAuthStore.getState().email;
  const token = useAuthStore.getState().token;
  const response = await axios.patch<createUserData>(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${email}`,
    {
      fields: {
        currWeight: { doubleValue: weight },
        currHeight: { doubleValue: height },
        BMIData: {
          arrayUnion: {
            values: [
              {
                doubleValue: 0,
              },
            ],
          },
        },
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
