import React from 'react';
import { Star } from '../../icons/star';
import { StarHalf } from '../../icons/star-half';
import { StarOutline } from '../../icons/star-outline';

import { hasDecimalPlace } from '../../utils/has-decimal-place';

export const ProductRating = (
  { value = 0 }
) => {
  let useHalfStar = hasDecimalPlace(value);
  const array = [];
  for (var i = 1; i < 6; ++i) {
    const key = i;
    if (i <= value) {
      array.push(<Star classes="star" key={key} />);
    } else {
      if (useHalfStar) {
        useHalfStar = false;
        array.push(<StarHalf classes="star" key={key} />);
      } else {
        array.push(<StarOutline classes="star" key={key} />);
      }
    }
  }
  return <div className="user-rating">{array}</div>
};