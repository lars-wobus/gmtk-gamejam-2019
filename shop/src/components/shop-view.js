import React from 'react';
import { Header } from './lars/header';
import { Banner } from './lars/banner';
import { Footer } from './lars/footer';
import { Alarm } from '../icons/alarm';
import { UserReview } from './lars/user-review';
import ProductImage from '../images/plumbus.png';

/*const createContainer = (type) => {
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
}*/

export const ShopView = (
  { userReviews, shopUpgrades, onButtonClick }
) => {
  let index = 0;
  const array = userReviews.map(element => {
    const key = index++;
    return <UserReview userData={element} key={key} />
  });
  const { buttonUpgrade, imageUpgrade} = shopUpgrades

  const { level } = buttonUpgrade;
  const buttonWidth = 15 * (1 + level);
  const buttonStyle = { width: `${buttonWidth}%` };

  const maxImageLevel = imageUpgrade.actions.length;
  const imageStepSize = 100 / maxImageLevel;
  const imageWidth = imageStepSize * imageUpgrade.level;
  const imageStyle = { width: `${imageWidth}%` };
  if (imageWidth === 0 ) {
    imageStyle.display = "none";
  } else {
    imageStyle.display = "block";
  }

  console.log(shopUpgrades);
  return <div id = "shopview">
    <Header />
    <Banner />
    <div id="buy" style={buttonStyle} onClick={() => onButtonClick()}>
      Buy Now
    </div>
    <img id="productimage" src={ProductImage} style={imageStyle} alt="Rendering of a Plumbus" />
    {/*<div>
      In Stock: 
    </div>
    <div>
      Remaining: 
    </div>*/}
    <Alarm classes="alarm-1" />
    <div className="review-container">{array}</div>
    <Footer />
  </div>
};