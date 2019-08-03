import React from 'react';
import { Button } from './button';
import { Header } from './lars/header';
import { Banner } from './lars/banner';
import { Footer } from './lars/footer';
import { Alarm } from '../icons/alarm';
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
    <Header />
    <Banner />
    <div id = "buy" onClick={console.log('TODO')}>
      Buy Now
    </div>
    <div>
      In Stock: 
    </div>
    <div>
      Remaining: 
    </div>
    <Alarm classes="alarm-1" />
    <div className="review-container">
      <UserReview />
      <UserReview />
      <UserReview />
      <UserReview />
      <UserReview />
    </div>
    <Footer />
  </div>
};