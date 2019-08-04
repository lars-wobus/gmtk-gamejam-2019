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

import { createUserReview } from './utils/create-user-review';
import { initEditorUpgrades, runUpgradeAction } from "./utils/editor-upgrades";
import { getRandomRankingNumber } from './utils/get-random-ranking-number';

import settings from './config/default-settings'
import editorStatsData from './data/editor-stats';
import editorUpgradeDefinitions from './data/editor-upgrades';
import editorSectionDefinitions from './data/editor-sections';
import editorInitialActions from './data/editor-initial-actions';
import tutorialData from './data/tutorial-data';

const ratingRange = [
  [0,3], [1,4], [3,5], [5,5]
];

let initializationDone = false;

function App() {
  const [showStartscreen, setShowStartscreen] = useState(settings.show_startscreen);
  const [showTutorialDialog, setShowTutorialDialog] = useState(settings.show_tutorial);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [shopName, setShopName] = useState(settings.default_shop_name);

  const [userReviews, setUserReviews] = useState([createUserReview(getRandomRankingNumber(ratingRange[0][0], ratingRange[0][1]), false)]);
  const [stats, setStats] = useState(editorStatsData);
  const [upgrades, setUpgrades] = useState(() => initEditorUpgrades(editorSectionDefinitions, editorUpgradeDefinitions));
  const [corporateDesignLevel, setCorporateDesignLevel] = useState(0);

  if (corporateDesignLevel > 4) {
    document.body.style["background-color"] = "rgb(241, 212, 212)";
  }

  const runAction = (action) => {
    runUpgradeAction(action, editorUpgradeDefinitions, upgrades, stats, message => onMessage(message));
  };

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

  const calculateStats = deltaTimeInSeconds => {
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
    let botVisits = bots * stats.botVisits.rate * deltaTimeInSeconds;
    let botPurchases = bots * stats.botPurchases.rate * deltaTimeInSeconds;

    let oldMails = stats.mails.value;
    calcRate(stats.mails, deltaTimeInSeconds);
    stats.mails.value += botMails;
    let newMails = stats.mails.value - oldMails;
    let newCalls = calcRate(stats.calls, deltaTimeInSeconds);

    let oldVisits = Math.floor(stats.visits.value);
    calcRate(stats.visits, deltaTimeInSeconds);
    stats.visits.value += botVisits;
    let botStolenMoney = bots * stats.botStealing.rate * deltaTimeInSeconds;
    stats.visits.value += (newMails + newCalls) * stats.adImpact.value;
    stats.visits.value += stats.publicOpinion.value / 100000 * stats.freeHumans.value;
    let newVisits = Math.floor(stats.visits.value) - oldVisits;
    stats.bots.value += newVisits * stats.browserExploits.value;
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
    stats.moneyStolen.value += botStolenMoney; // TODO: fix moneyStolen rate inaccurate after this

    let moneyEarned = conversions + moneyStolen;
    stats.money.value += moneyEarned;
    stats.money.rate = moneyEarned / deltaTimeInSeconds; // TODO calculate sliding average instead
    if (settings.rich_mode && stats.money.value < 99999999) stats.money.value = 99999999;

    if (newVisits > 0) onNewVisits(newVisits);
    if (newPurchases > 0) onNewPurchases(newPurchases);
  };

  const updateTimedUpgrades = deltaTimeInSeconds => {
    Object.keys(upgrades).forEach(sectionName => {
      let section = upgrades[sectionName];
      Object.keys(section.upgrades).forEach(upgradeName => {
        let upgrade = section.upgrades[upgradeName];

        if (upgrade.type === "research" && upgrade.isRunning) {
          upgrade.progress += deltaTimeInSeconds / upgrade.duration * settings.upgrade_speed_multiplier;
          if (upgrade.progress >= 1) {
            upgrade.isRunning = false;
            upgrade.isDone = true;
            upgrade.level = 1;
            runAction(upgrade.actions);
            onEditorDataChanged();
            onUpgradeEvent(upgrade.name, upgrade.level);
          }
        }

        if (upgrade.type === "operation" && upgrade.isOnCooldown) {
          upgrade.cooldownProgress += deltaTimeInSeconds / upgrade.cooldown * settings.cooldown_speed_multiplier;
          if (upgrade.cooldownProgress >= 1) upgrade.isOnCooldown = false;
        }
      });
    });
  };

  const onUpgradeClicked = it => {
    let cost = it.costs;
    if (Array.isArray(cost)) cost = cost[it.level];
    if (cost > stats.money.value) {
      console.warn(`tried to buy upgrade "${it.name}" not having enough money! have: ${stats.money.value}, needed: ${cost}`);
      return;
    }

    if (it.name === "hackCompetitor" && stats.competitors.value < 1) {
      console.warn(`cannot run "${it.name}" without any competitors left!`);
      return;
    }

    stats.money.value -= cost;
    switch (it.type) {
      case "multilevel":
        runAction(it.actions[it.level]);
        it.level++;
        it.isDone = it.level === it.actions.length;
        onEditorDataChanged();
        onUpgradeEvent(it.name, it.level);
        break;
      case "normal":
        runAction(it.actions);
        it.level = 1;
        it.isDone = true;
        onEditorDataChanged();
        onUpgradeEvent(it.name, it.level);
        break;
      case "research":
        it.isRunning = true;
        it.progress = 0;
        onEditorDataChanged();
        break;
      case "operation":
        runAction(it.actions);
        if (it.isRepeatable) {
          it.isOnCooldown = true;
          it.cooldownProgress = 0;
        } else {
          it.isDone = true;
          it.level = 1;
        }
        onEditorDataChanged();
        break;
      default:
        console.error(`onUpgradeClicked could not handle upgrade of type "${it.type}"`);
        break;
    }
  };

  const onEditorDataChanged = () => {
    setStats(Object.assign({}, stats));
    setUpgrades(Object.assign({}, upgrades));
    setCorporateDesignLevel(upgrades.shop.upgrades.buttonUpgrade.level);
  };

  const onNewVisits = amount => {
    // TODO: do something with this
  };

  const onNewPurchases = amount => {
    // TODO: do something with this
  };

  const onMessage = message => {
    alert(message);
  };

  const onUpgradeEvent = (upgradeEvent, level) => {
    // TODO: do something with this
  };

  if (!initializationDone) {
    initializationDone = true;

    editorInitialActions.forEach(action => runAction(action));
    setStats(stats);
    setUpgrades(upgrades);
  }

  useEffect(() => {
    const delta = 1 / settings.updates_per_second;
    const interval = setInterval(() => {
      calculateStats(delta);
      updateTimedUpgrades(delta);
      onEditorDataChanged();
    }, delta * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const { level } = upgrades.shop.upgrades.fakeReviews;
    if (level < 1) {
      return;
    }
    const interval = setInterval(() => {
      const range = ratingRange[level];
      const rating = getRandomRankingNumber(range[0], range[1]);
      console.log(rating);
      if (userReviews.length < 30) {
        setUserReviews([...userReviews, createUserReview(rating, level >= 2)]);
      } else {
        userReviews.shift();
        setUserReviews([...userReviews, createUserReview(rating, level >= 2)]);
      }
    }, 8000 / (level + 2));

    return () => {
      clearInterval(interval);
    };
  }, [userReviews, upgrades.shop.upgrades.fakeReviews.level]);

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
