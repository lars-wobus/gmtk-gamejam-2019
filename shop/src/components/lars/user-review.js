import React from 'react';
import { ProductRating } from './product-rating';

export const UserReview = (
  { userData }
) => {
  const {
    name, rating, isVerified, comment
  } = userData;

  return <div className="user-review">
    <div className="user-review-1">
      <div className="user-name">{name}</div>
      <ProductRating value={rating}/>
      <div className="user-verification">{isVerified}</div>
    </div>
    <div className="user-review-2">
      <div className="user-comment">{comment}</div>
    </div>
  </div>
};
