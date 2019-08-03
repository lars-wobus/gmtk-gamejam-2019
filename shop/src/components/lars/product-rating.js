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
    if (i <= value) {
      array.push(<Star />);
    } else {
      if (useHalfStar) {
        useHalfStar = false;
        array.push(<StarHalf />);
      } else {
        array.push(<StarOutline />);
      }
    }
  }
  return <div className="user-rating">{array}</div>
};