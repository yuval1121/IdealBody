export const calculateBMI = (height: number, weight: number) => {
  return parseFloat((weight / height ** 2).toFixed(3));
};
