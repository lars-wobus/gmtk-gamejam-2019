import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/tutorial-dialog.css';
import './styles/user-reviews.css';
import './styles/icons.css';
import './styles/editor-view.css';
import './styles/shop-view.css';

import { Startscreen } from './components/lars/start-screen';
import { TutorialDialog } from './components/lars/tutorial-dialog';
import { EditorView } from './components/editor-view';
import { ShopView } from './components/shop-view';

import { sortElementsByType } from './utils/sort-elements-by-type';
import { createUserReview } from './utils/create-user-review';
import { initEditorUpgrades, runUpgradeAction } from "./utils/editor-upgrades";

import settings from './config/default-settings'
import editorStatsData from './data/editor-stats';
import editorUpgradeDefinitions from './data/editor-upgrades';
import editorSectionDefinitions from './data/editor-sections';
import editorInitialActions from './data/editor-initial-actions';
import shopData from './data/shop-data';
import tutorialData from './data/tutorial-data';

let initializationDone = false;
let reviewIntervalId = null;

function App() {
  const [showStartscreen, setShowStartscreen] = useState(settings.show_startscreen);
  const [showTutorialDialog, setShowTutorialDialog] = useState(settings.show_tutorial);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [shopName, setShopName] = useState(settings.default_shop_name);

  const [userReviews, setUserReviews] = useState([]);
  const [stats, setStats] = useState(editorStatsData);
  const [upgrades, setUpgrades] = useState(() => initEditorUpgrades(editorSectionDefinitions, editorUpgradeDefinitions));
  const [shopButtons, setShopButtons] = useState(shopData.buttons);

  const onSkipButtonClick = () => {
    setShowTutorialDialog(false);
  };

  const onPreviousButtonClick = () => {
    setTutorialIndex(tutorialIndex - 1);
  };

  const onNextButtonClick = () => {
    setTutorialIndex(tutorialIndex + 1);
  };

  const onPurchaseButtonClicked = () => {
    stats.purchases.value++;
    stats.money.value++;
    onEditorDataChanged();
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
    if (settings.rich_mode && stats.money.value < 99999999) stats.money.value = 99999999;
    setStats(stats);

    if (newVisits > 0) onNewVisits(newVisits);
    if (newPurchases > 0) onNewPurchases(newPurchases);
  };

  const onUpgradeClicked = it => {
    let cost = it.costs;
    if (Array.isArray(cost)) cost = cost[it.level];
    if (cost > stats.money.value) {
      console.warn(`tried to buy upgrade "${it.name}" not having enough money! have: ${stats.money.value}, needed: ${cost}`);
      return;
    }

    let action = "";
    switch (it.type) {
      case "multilevel":
        action = it.actions[it.level];
        it.level++;
        it.isDone = it.level === it.actions.length;
        break;
      case "normal":
        action = it.actions;
        it.level = 1;
        it.isDone = true;
    }
    runUpgradeAction(action, editorUpgradeDefinitions, upgrades, stats, message => onMessage(message));
    stats.money.value -= cost;
    onEditorDataChanged();
    onUpgradeEvent(it.name, it.level);
  };

  const onEditorDataChanged = () => {
    setStats(Object.assign({}, stats));
    setUpgrades(Object.assign({}, upgrades));
  };

  const onNewVisits = amount => {
    // TODO: do something with this
  };

  const onNewPurchases = amount => {
    // TODO: do something with this
  };

  const onMessage = message => {
    // TODO: do something with this
  };

  const onUpgradeEvent = (upgradeEvent, level) => {
    // TODO: do something with this
  };

  if (!initializationDone) {
    initializationDone = true;

    editorInitialActions.forEach(action => {
      runUpgradeAction(action, editorUpgradeDefinitions, upgrades, stats, () => onMessage())
    });
    setStats(stats);
    setUpgrades(upgrades);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      calculateStats(0.5);
      onEditorDataChanged();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
            <ShopView
              userReviews={userReviews}
              onButtonClick={onPurchaseButtonClicked}
              shopUpgrades={upgrades.shop.upgrades}
              onUpgrade={it => onUpgradeClicked(it)}
            />
            <EditorView
              stats={stats}
              upgradeSections={upgrades}
              onUpgrade={it => onUpgradeClicked(it)}
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
