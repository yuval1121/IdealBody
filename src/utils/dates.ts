import dayjs from 'dayjs';

export const getLast6Days = () => {
  const days = [];

  for (let i = 0; i < 6; i++) {
    const day = dayjs().subtract(i, 'd');
    days.push(day);
  }

  return days.reverse();
};

export const getLast6DaysLabels = () => {
  return getLast6Days().map(d => d.format('ddd'));
};
