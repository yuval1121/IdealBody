export const getTodaysTimeStamp = () => {
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);
  return timestamp;
};
