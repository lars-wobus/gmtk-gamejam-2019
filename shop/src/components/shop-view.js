import React from 'react';
import { Button } from './button';
import { UserReview } from './lars/user-review';

const createContainer = (type) => {
  switch(type){
    case "image": {
      return <img alt="Main product" />
    }
    case "video": {
      return <video alt="Main product" />
    }
    case "canvas": {
      return <canvas alt="3D viewer of the product" />;
    }
    default: return <div></div>
  }
}

export const ShopView = (
  { buttons=[] }
) => {
  return <div id = "shopview">
    <div>
      Header
    </div>
    <div>
      Banner
      <img alt="Banner"/>
    </div>
    {createContainer()}
    <Button
      label="Buy Now"
      onButtonClick={() => console.log('TODO')}
    />
    <div className="review-container">
      <UserReview />
      <UserReview />
      <UserReview />
      <UserReview />
      <UserReview />
    </div>
    <div>
      Footer
    </div>
  </div>
};