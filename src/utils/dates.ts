import dayjs from 'dayjs';

export const getLast6Days = () => {
  const days = [];

  for (let i = 5; i >= 0; i--) {
    const day = dayjs().subtract(i, 'd');
    days.push(day);
  }

  return days;
};

export const getLast6DaysLabels = () => {
  return getLast6Days().map(d => d.format('ddd'));
};
