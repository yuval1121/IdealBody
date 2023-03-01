import { PROJECT_ID } from '@env';
import axios from 'axios';
import { userData } from './types';

export const addUserData = async ({
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
        // BMIData: { arrayValue: [] },
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
