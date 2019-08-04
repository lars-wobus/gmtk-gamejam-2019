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

const imageWidths = [50, 60, 70, 75];

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
    fakeReviews, tellYourFriendsBox, crossSelling, hypnoticBackground
  } = shopUpgrades;

  const grayscale = `grayscale(${25 * (4 - imageUpgrade.level - 1)}%`;
  const imageStyle = {
    width: `${imageWidths[imageUpgrade.level]}%`,
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
    {(hypnoticBackground.level > 0) && <div><div className="background"></div></div>}
    
    {<Header classes={(showHeader ? `${corporateDesign}` : "hidden")} />}
    {(tellYourFriendsBox.level > 0) && <Banner classes={(showBanner ? `${corporateDesign}` : "hidden")} text={bannerData[tellYourFriendsBox.level-1]} />}
    <div className={buttonClass} onClick={() => onButtonClick()}>
      Buy Now
    </div>
    {(imageUpgrade.isVisible) &&
      <div id="productimage" style={imageStyle}>
        <img 
          className={(imageUpgrade.level >= 3) ? "active": ""}
          src={ProductImage}
          style={{ width: "100%" }}
          alt="Rendering of a Plumbus"
        />
        
      </div>
    }
    {labels}
    {(suggestiveEmojis.level >= 1) && <GestureTabHold classes="gesturetabhold" />}
    {(suggestiveEmojis.level >= 2) && <BellRing classes="bellring" />}
    {(suggestiveEmojis.level >= 3) && <Alarm classes="alarm" />}

    {(crossSelling.level > 0) && <CrossSellingTable classes={`${corporateDesign}`} />}
    {(showReviews) && <div className={`review-container ${corporateDesign}`}>{array}</div>}
    {<Footer classes={(showFooter ? `${corporateDesign}` : "hidden")} />}
  </div>
};
