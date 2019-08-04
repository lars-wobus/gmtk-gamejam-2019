import React from 'react';
import { Header } from './lars/header';
import { Banner } from './lars/banner';
import { Footer } from './lars/footer';
import { Label } from '../icons/label';
import { GestureTabHold } from '../icons/gesture-tab-hold';
import { BellRing } from '../icons/bell-ring';
import { Alarm } from '../icons/alarm';
import { UserReview } from './lars/user-review';
import { CrossSellingTable }from './lars/cross-selling-table';
import ProductImage from '../images/plumbus.png';

import bannerData from '../data/tell-your-friends-data';

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
    fakeReviews, tellYourFriendsBox
  } = shopUpgrades;
  console.log(shopUpgrades);
  const maxImageLevel = imageUpgrade.actions.length;
  const imageStepSize = 100 / (maxImageLevel + 1);
  const imageWidth = imageStepSize * (imageUpgrade.level + 1);
  const grayscale = `grayscale(${25 * (4 - imageUpgrade.level - 1)}%`;
  const imageStyle = {
    width: `${imageWidth}%`,
    "-webkit-filter": grayscale,
    filter: grayscale
  };

  const labels = [];
  for (var i = 0; i < guidingArrows.level; ++i) {
    labels.push(<Label classes={`guidingarrow-${i}`} />);
  }

  const buttonClass = `buy buy-${buttonUpgrade.level}`;
  const showHeader = buttonUpgrade.level > 1;
  const showBanner = tellYourFriendsBox.level > 0;
  const showFooter = buttonUpgrade.level > 3;
  const corporateDesign = buttonUpgrade.level > 4 ? "active" : "";
  const showReviews = fakeReviews.level > 0;

  return <div id = "shopview">
    {<Header classes={(showHeader ? `${corporateDesign}` : "hidden")} />}
    {(tellYourFriendsBox.level > 0) && <Banner classes={(showBanner ? `${corporateDesign}` : "hidden")} text={bannerData[tellYourFriendsBox.level-1]} />}
    <div className={buttonClass} onClick={() => onButtonClick()}>
      Buy Now
    </div>
    {(imageUpgrade.isVisible) && <img id="productimage" src={ProductImage} style={imageStyle} alt="Rendering of a Plumbus" />}
    {labels}
    {(suggestiveEmojis.level >= 1) && <GestureTabHold classes="gesturetabhold" />}
    {(suggestiveEmojis.level >= 2) && <BellRing classes="bellring" />}
    {(suggestiveEmojis.level >= 3) && <Alarm classes="alarm" />}
    <CrossSellingTable />
    {(showReviews) && <div className="review-container">{array}</div>}
    {<Footer classes={(showFooter ? `${corporateDesign}` : "hidden")} />}
  </div>
};
