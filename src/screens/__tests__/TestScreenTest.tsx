import { fireEvent, render } from '@testing-library/react-native';
import TestScreen from '../TestScreen';

describe('Test Screen', () => {
  it('test something', () => {
    const page = render(<TestScreen />);
    const loginButton = page.getByTestId('txt');
    fireEvent.press(loginButton);
    expect(loginButton).toBeTruthy();
  });
});
