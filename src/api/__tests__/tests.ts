import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';
import { enterPrompt } from '../chatgpt';

describe('API tests', () => {
  // it('ChatGPT api test', async () => {
  //   const res = await enterPrompt('Hello');
  //   expect(res).toBeTruthy();
  // });

  it('Auth tests', async () => {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, 'foo', 'foo');
  });
});
