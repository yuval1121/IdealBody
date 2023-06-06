import { act, fireEvent, render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';
import { Provider } from 'react-native-paper';
import { UserDocument } from '../../api/user/types';
import InfoGraphMock from '../Elements/InfoGraphMock';
import MockModal from '../Elements/Modals/MockModal';
type t = Omit<UserDocument, 'timestamp' | 'weight'> & { timestamp: Date };

describe('Component testing', () => {
  it('InfoGraph test', () => {
    const dummyData: t = {
      water: 5,
      height: 1.87,
      caloriesIn: 500,
      caloriesOut: 900,
      BMI: 25,
      timestamp: new Date(),
    };

    const derived = [
      { ...dummyData, weight: 70 },
      {
        ...dummyData,
        timestamp: dayjs(dummyData.timestamp).add(1, 'day').toDate(),
        weight: 80,
      },
    ];

    render(<InfoGraphMock data={derived} />);
    screen.getByTestId('MainContainerFull');

    render(<InfoGraphMock data={[]} />);
    screen.getByTestId('MainContainerEmpty');

    render(<InfoGraphMock data={null} />);
    screen.getByTestId('Loading');
  });

  it('Modal Testing', async () => {
    const setVisible = jest.fn();
    render(
      <Provider>
        <MockModal visible={true} setVisible={setVisible} />{' '}
      </Provider>
    );
    const input = await screen.getByTestId('calorieInput');
    fireEvent.changeText(input, '500');
    await act(async () => {
      await fireEvent.press(await screen.getByTestId('sub'));
    });
    expect(setVisible).toBeCalled();
  });
});
