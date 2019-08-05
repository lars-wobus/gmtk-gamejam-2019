export const getRandomRankingNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
    + ((Math.random() > 0.5) ? 0.5 : 0);
};
