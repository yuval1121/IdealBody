import { fireEvent, render } from '@testing-library/react-native';
import DataScreen from '../DataScreen';

describe('Test Screen', () => {
  it('test something', () => {
    const page = render(<DataScreen />);
    const loginButton = page.getByTestId('txt');
    fireEvent.press(loginButton);
    expect(loginButton).toBeTruthy();
  });
});
