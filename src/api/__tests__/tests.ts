import { API_TOKEN, PROJECT_ID } from '@env';
import crypto from 'crypto';
import { enterPrompt } from '../chatgpt';

describe('API tests', () => {
  it('ChatGPT test', async () => {
    const res = await enterPrompt('Hello');
    expect(res).toBeTruthy();
  });
  const email = `${crypto.randomUUID()}@${crypto.randomUUID()}.com`;
  const password = crypto.randomUUID();

  it('Sign up test', async () => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_TOKEN}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data).toHaveProperty('idToken');
  });

  it('Sign in test', async () => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_TOKEN}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data).toHaveProperty('idToken');
  });

  it('Firestore get data', async () => {
    const authRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_TOKEN}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: 'c@c.com',
          password: '123456',
          returnSecureToken: true,
        }),
      }
    );
    const authData = await authRes.json();
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${authData.localId}
      `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.idToken}`,
        },
      }
    );
    const { fields } = await res.json();
    expect(fields).toHaveProperty('caloriesOut');
    expect(fields).toHaveProperty('weight');
    expect(fields).toHaveProperty('height');
  });
});
