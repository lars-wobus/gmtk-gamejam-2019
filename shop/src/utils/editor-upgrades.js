export const initEditorUpgrades = (
  sectionDefinitions,
  upgradeDefinitions
) => {
  let upgradeData = {};

  Object.keys(sectionDefinitions).forEach(sectionName => {
    upgradeData[sectionName] = {
      name: sectionName,
      label: sectionDefinitions[sectionName],
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
      maxLevel: upgradeDef.type === "multilevel" ? upgradeDef.actions.length : 1,
      actions: upgradeDef.actions
    };
    console.info(`initialized upgrade "${sectionName}"/"${upgradeName}"`);
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
    let operation = parts.shift();
    switch (operation) {
      case "plus":
        changeStat(action, statsData, parts[0], parts[1], (stat, amount) => stat.value += amount);
        break;
      case "multiply":
        changeStat(action, statsData, parts[0], parts[1], (stat, amount) => stat.value *= amount);
        break;
      case "set":
        changeStat(action, statsData, parts[0], parts[1], (stat, amount) => stat.value = amount);
        break;
      case "activate":
        activateUpgrade(action, upgradeDefinitions, upgradeData, parts);
        break;
      case "show":
        let statName = parts.shift();
        activateStat(action, statsData, statName, parts);
        break;
      case "message":
        onMessage(parts.join(" "));
        break;
      default:
        console.error(`could not perform action "${action}": unknown operation "${operation}"!`);
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
  console.info(`changed stat with action: "${action}"`)
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
    console.info(`activated upgrade "${sectionName}"/"${upgradeName}"!`);
  });
};

const activateStat = (action, statsData, statName, elements) => {
  let stat = statsData[statName];
  if (!stat) {
    console.error(`could not perform action "${action}": could not find stat "${statName}"!`);
    return;
  }

  stat.statVisible = true;
  console.info(`activated stat "${statName}!`);
  elements.forEach(element => {
    if (element !== "value" && element !== "cap" && element !== "rate" && element !== "rateCap") {
      console.error(`error while performing action "${action}": invalid stat element "${statName}.${element}"!`);
      return;
    }

    let elementValue = stat[element];
    let visiblePropertyName = `${element}Visible`;
    if (elementValue === undefined || elementValue === null) {
      console.error(`error while performing action "${action}": could not find stat element "${statName}.${element}"!`);
      return;
    }
    stat[visiblePropertyName] = true;
    console.info(`activated stat element "${statName}.${element}"!`);
  });
};
