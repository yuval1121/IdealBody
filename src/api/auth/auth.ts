import axios from 'axios';

const API_KEY = 'AIzaSyDtcJQzQwGGOMjhFTt6E1iELJoUnnv_CLA';

interface userDataRequest {
  email: string;
  password: string;
}

interface userDataResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localid: string;
  registered: boolean;
}

export const createUser = async ({ email, password }: userDataRequest) => {
  const response = await axios.post<userDataResponse>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  const { data } = response;
  return data;
};
