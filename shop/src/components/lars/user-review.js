import React from 'react';
import { ProductRating } from './product-rating';

export const UserReview = () => {
  return <div className="user-review">
    <div className="user-review-1">
      <div className="user-name">John Doe</div>
      <ProductRating value={2}/>
      <div className="user-verification">Verified Purchase</div>
    </div>
    <div className="user-review-2">
      <div className="user-comment">I like this product</div>
    </div>
  </div>
};
