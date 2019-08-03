import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/tutorial-dialog.css';
import './styles/user-reviews.css';
import './styles/icons.css';

import { Startscreen } from './components/lars/start-screen';
import { TutorialDialog } from './components/lars/tutorial-dialog';
import { EditorView } from './components/editor-view';
import { ShopView } from './components/shop-view';

import { sortElementsByType } from './utils/sort-elements-by-type';
import { createUserReview } from './utils/create-user-review';

import settings from './config/default-settings'
import editorData from './data/editor-data';
import statsData from './data/stats-data';
import shopData from './data/shop-data';
import tutorialData from './data/tutorial-data';

const editorElements = sortElementsByType(editorData);

let reviewIntervalId = null;

function App() {
  const [showStartscreen, setShowStartscreen] = useState(settings.show_startscreen);
  const [showTutorialDialog, setShowTutorialDialog] = useState(settings.show_tutorial);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [shopName, setShopName] = useState(settings.default_shop_name);
  const [stats, setStats] = useState(statsData);
  const [editorButtons] = useState(editorElements.buttons);
  const [editorTextfields] = useState(editorElements.textfields);

  const [userReviews, setUserReviews] = useState([]);

  const onSkipButtonClick = () => {
    setShowTutorialDialog(false);
  }

  const onPreviousButtonClick = () => {
    setTutorialIndex(tutorialIndex - 1);
  };

  const onNextButtonClick = () => {
    setTutorialIndex(tutorialIndex + 1);
  };

  const onButtonClick = () => {
    console.log('Button was clicked');
  };

  const calcRate = (stat, deltaTimeInSeconds) => {
    if (!stat.rate) return 0;
    let rate = stat.rate;
    if (stat.rateCap !== null && stat.rateCap < rate) rate = stat.rateCap;
    let increase = rate * deltaTimeInSeconds;
    stat.value += increase;
    if (stat.cap !== null && stat.cap < stat.value) stat.value = stat.cap;
    return increase;
  };

  const calculateStats = (deltaTimeInSeconds) => {
    calcRate(stats.captiveHumans, deltaTimeInSeconds);
    calcRate(stats.freeHumans, deltaTimeInSeconds);
    let huntedHumans = stats.huntedHumans.rate * deltaTimeInSeconds;
    if (huntedHumans > stats.captiveHumans.cap) huntedHumans = stats.captiveHumans.cap;
    if (huntedHumans > stats.freeHumans.value) huntedHumans = stats.freeHumans.value;
    stats.huntedHumans.value += huntedHumans;
    stats.captiveHumans.value += huntedHumans;
    stats.freeHumans.value -= huntedHumans;

    calcRate(stats.bots, deltaTimeInSeconds);
    let bots = stats.bots.value;
    let botMails = bots * stats.botMails.rate * deltaTimeInSeconds;
    let botPurchases = bots * stats.botPurchases.rate * deltaTimeInSeconds;

    let oldMails = stats.mails.value;
    calcRate(stats.mails, deltaTimeInSeconds);
    stats.mails.value += botMails;
    let newMails = stats.mails.value - oldMails;
    let newCalls = calcRate(stats.calls, deltaTimeInSeconds);

    let oldVisits = Math.floor(stats.visits.value);
    calcRate(stats.visits, deltaTimeInSeconds);
    stats.visits.value += (newMails + newCalls) * stats.adImpact.value;
    stats.visits.value += stats.publicOpinion.value / 100000 * stats.freeHumans.value;
    let newVisits = Math.floor(stats.visits.value) - oldVisits;
    let conversions = newVisits * stats.conversion.value;

    let purchasesFromFarms = stats.captiveHumanEfficiency.rate * deltaTimeInSeconds * stats.captiveHumans.value;

    let oldDemandValue = stats.demand.value;
    let newDemandValue = oldDemandValue + stats.demand.rate * deltaTimeInSeconds / (1 + stats.competitors.value);
    let purchasesFromDemand = Math.floor(newDemandValue);
    stats.demand.value = newDemandValue - purchasesFromDemand;

    let oldPurchases = Math.floor(stats.purchases.value);
    let additionalPurchases = conversions + botPurchases + purchasesFromDemand + purchasesFromFarms;
    stats.purchases.value += additionalPurchases;
    stats.purchases.rate = additionalPurchases / deltaTimeInSeconds;
    let newPurchases = Math.floor(stats.purchases.value) - oldPurchases;

    let moneyStolen = calcRate(stats.moneyStolen, deltaTimeInSeconds);

    let moneyEarned = conversions + moneyStolen;
    stats.money.value += moneyEarned;
    stats.money.rate = moneyEarned / deltaTimeInSeconds; // TODO calculate sliding average instead
    setStats(stats);

    if (newVisits > 0) onNewVisits(newVisits);
    if (newPurchases > 0) onNewPurchases(newPurchases);
  };

  const onNewVisits = (amount) => {
    // TODO: do something with this
  };

  const onNewPurchases = (amount) => {
    // TODO: do something with this
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (userReviews.length < 30) {
        setUserReviews([...userReviews, createUserReview(0, false)]);
      } else {
        userReviews.shift();
        setUserReviews([...userReviews, createUserReview(0, false)]);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [userReviews]);

  return (
    <div className="App">
      { showStartscreen
         ? <Startscreen
          defaultValue={settings.default_shop_name}
          onButtonClick={() => setShowStartscreen(false)}
          onTextInputChange={(event) => {setShopName(event.target.value);}}
         />
         : <>
          <>
            <EditorView
              stats={stats}
              buttons={editorButtons}
              textfields={editorTextfields}
              onButtonClick={() => console.log('Some old button was clicked')}
            />
            <ShopView
              userReviews={userReviews}
              onButtonClick={onButtonClick}
            />
          </>
          {
            showTutorialDialog &&
            <TutorialDialog
              data={tutorialData[tutorialIndex]}
              onSkipButtonClick={() => onSkipButtonClick()}
              onPreviousButtonClick={() => onPreviousButtonClick()}
              onNextButtonClick={() => onNextButtonClick()}
            />}
        </>
      }
    </div>
  );
}

export default App;
