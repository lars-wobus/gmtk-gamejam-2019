import { getRandomUserName } from './get-random-user-name';
import { getRandomUserComment } from './get-random-user-comment';

export const createUserReview = ( userRating, userVerified ) => {
  const isVerified = (userVerified) ? "Verified Purchase" : "unverified";
  return {
    name: getRandomUserName(),
    rating: userRating,
    isVerified: isVerified,
    comment: getRandomUserComment()
  }
};