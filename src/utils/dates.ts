export const getTodaysTimestamp = () => {
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);
  return timestamp;
};
