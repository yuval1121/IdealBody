import ky from 'ky';

const API_KEY = 'AIzaSyDtcJQzQwGGOMjhFTt6E1iELJoUnnv_CLA';

export const createUser = async (email: string, password: string) => {
  const response = await ky
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        json: {
          email,
          password,
          returnSecureToken: true,
        },
      }
    )
    .json();

  return response;
};
