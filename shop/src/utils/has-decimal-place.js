export const hasDecimalPlace = (number) => {
  return (number - Math.floor(number)) !== 0;
};
