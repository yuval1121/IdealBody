const API_KEY = 'AIzaSyDtcJQzQwGGOMjhFTt6E1iELJoUnnv_CLA';

interface userDataRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
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
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  }

  const data: userDataResponse = await response.json();
  return data;
};

export const signUserIn = async (email: string, password: string) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  }

  const data: userDataResponse = await response.json();
  console.log(data);
  return data;
};
