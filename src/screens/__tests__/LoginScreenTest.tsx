import LoginScreen from '../LoginScreen';
import { fireEvent, render } from '@testing-library/react-native';

describe('Login Screen', () => {
  it('test something', () => {
    const page = render(<LoginScreen />);
    const loginButton = page.getByTestId('loginButton');
    fireEvent.press(loginButton);
    expect(loginButton).toBeTruthy();
  });
});
