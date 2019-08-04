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
    buttonUpgrade, imageUpgrade, guidingArrows, suggestiveEmojis,
    fakeReviews
  } = shopUpgrades;

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

  const buttonClass = `buy buy-${buttonUpgrade.level}`;
  const showHeader = buttonUpgrade.level > 1;
  const showBanner = buttonUpgrade.level > 2;
  const showFooter = buttonUpgrade.level > 3;
  const corporateDesign = buttonUpgrade.level > 4 ? "active" : "";
  const showReviews = fakeReviews.level > 0;

  return <div id = "shopview">
    {<Header classes={(showHeader ? `${corporateDesign}` : "hidden")} />}
    {<Banner classes={(showBanner ? `${corporateDesign}` : "hidden")} />}
    <div className={buttonClass} onClick={() => onButtonClick()}>
      Buy Now
    </div>
    {(imageUpgrade.level !== 0 ) && <img id="productimage" src={ProductImage} style={imageStyle} alt="Rendering of a Plumbus" />}
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
    {(showReviews) && <div className="review-container">{array}</div>}
    {<Footer classes={(showFooter ? `${corporateDesign}` : "hidden")} />}
  </div>
};
