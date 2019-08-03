import { getRandomUserName } from './get-random-user-name';

export const createUserReview = ( userRating, userVerified ) => {
  const isVerified = (userVerified) ? "Verified Purchase" : "unverified";
  return {
    name: getRandomUserName(),
    rating: userRating,
    isVerified: isVerified,
    comment: "I think I have to order another one"
  }
};