export const calculateBMI = (height: number, weight: number) => {
  try {
    return parseFloat((weight / height ** 2).toFixed(3));
  } catch (e) {
    return 0;
  }
};
