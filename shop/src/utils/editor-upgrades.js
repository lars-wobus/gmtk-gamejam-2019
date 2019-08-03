export const initEditorUpgrades = (
  sectionNames,
  upgradeDefinitions,
  initialActions,
  statsData,
  onMessage
) => {
  let upgradeData = {};

  sectionNames.forEach(sectionName => {
    upgradeData[sectionName] = {
      name: sectionName,
      isVisible: false,
      upgrades: []
    };
    console.info(`initialized upgrade section "${sectionName}"`);
  });

  Object.keys(upgradeDefinitions).forEach(upgradeName => {
    let upgradeDef = upgradeDefinitions[upgradeName];
    let sectionName = upgradeDef.section;
    let section = upgradeData[sectionName];
    if (!section) {
      console.log(`cannot add upgrade "${upgradeName}": section "${sectionName}" does not exist!`);
      return;
    }
    section.upgrades[upgradeName] = {
      name: upgradeName,
      label: upgradeDef.label,
      type: upgradeDef.type,
      isVisible: false,
      isDone: false,
      level: 0,
      actions: upgradeDef.actions
    };
    console.info(`initialized upgrade "${sectionName}"/"${upgradeName}"`);
  });

  initialActions.forEach(action => {
    runUpgradeAction(action, upgradeDefinitions, upgradeData, statsData, onMessage)
  });

  return upgradeData;
};

export const runUpgradeAction = (
  actionString,
  upgradeDefinitions,
  upgradeData,
  statsData,
  onMessage
) => {
  actionString.split(";").forEach(action => {
    action = action.trim();
    let parts = action
      .split(" ")
      .filter(word => word.length > 0);
    switch (parts.shift()) {
      case "plus":
        changeStat(action, statsData, parts[0], parts[1], (stat, amount) => stat.value += amount);
        break;
      case "times":
        changeStat(action, statsData, parts[0], parts[1], (stat, amount) => stat.value *= amount);
        break;
      case "set":
        changeStat(action, statsData, parts[0], parts[1], (stat, amount) => stat.value = amount);
        break;
      case "activate":
        activateUpgrade(action, upgradeDefinitions, upgradeData, parts);
        break;
      case "message":
        onMessage(parts.join(" "));
        break;
    }
  });
};

const changeStat = (action, statsData, statName, amountString, operation) => {
  let stat = statsData[statName];
  if (!stat) {
    console.error(`could not perform action "${action}": could not find stat "${statName}"!`);
    return;
  }

  let amount = Number(amountString);
  if (amount === Number.NaN) {
    console.error(`could not perform action "${action}": could not parse amount "${amountString}"!`);
    return;
  }

  operation(stat, amount);
};

const activateUpgrade = (action, upgradeDefinitions, upgradeData, upgradeNames) => {
  upgradeNames.forEach(upgradeName => {
    let def = upgradeDefinitions[upgradeName];
    if (!def) {
      console.error(`could not perform action "${action}": could not find upgrade "${upgradeName}"!`);
      return;
    }
    let sectionName = def.section;
    let section = upgradeData[sectionName];
    section.isVisible = true;
    section.upgrades[upgradeName].isVisible = true;
  });
};
