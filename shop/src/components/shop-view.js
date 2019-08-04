import React from 'react';
import { Header } from './lars/header';
import { Banner } from './lars/banner';
import { Footer } from './lars/footer';
import { Label } from '../icons/label';
import { GestureTabHold } from '../icons/gesture-tab-hold';
import { BellRing } from '../icons/bell-ring';
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
  const {
    buttonUpgrade, imageUpgrade, guidingArrows, suggestiveEmojis
  } = shopUpgrades;

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

  const labels = [];
  for (var i = 0; i < guidingArrows.level; ++i) {
    labels.push(<Label classes={`guidingarrow-${i}`} />);
  }

  const showHeader = false;
  const showBanner = false;
  const showFooter = false;
  const showReviews = false;

  console.log(shopUpgrades);
  return <div id = "shopview">
    {showHeader && <Header />}
    {showBanner && <Banner />}
    <div id="buy" style={buttonStyle} onClick={() => onButtonClick()}>
      Buy Now
    </div>
    <img id="productimage" src={ProductImage} style={imageStyle} alt="Rendering of a Plumbus" />
    {labels}
    {(suggestiveEmojis.level >= 1) && <GestureTabHold classes="gesturetabhold" />}
    {(suggestiveEmojis.level >= 2) && <BellRing classes="bellring" />}
    {(suggestiveEmojis.level >= 3) && <Alarm classes="alarm" />}
    {/*<div>
      In Stock: 
    </div>
    <div>
      Remaining: 
    </div>*
    <Alarm classes="alarm-1" />*/}
    {(showReviews && array.length > 0) && <div className="review-container">{array}</div>}
    {showFooter && <Footer />}
  </div>
};