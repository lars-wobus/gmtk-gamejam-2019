import React from 'react';
import { Button } from "../button";

export const UpgradeElement = (
  {upgrade, onUpgrade}
) => {
  if (!upgrade.isVisible) return null;
  switch (upgrade.type) {
    case "normal":
      return normal(upgrade, onUpgrade);
    case "multilevel":
      return multiLevel(upgrade, onUpgrade);
    case "research":
      return research(upgrade, onUpgrade);
    default:
      console.error(`cannot render upgrade "${upgrade.name}": unknown upgrade type "${upgrade.type}"!`);
      return null;
  }
};

const normal = (it, onUpgrade) => {
  if (it.isDone) {
    return null
  } else {
    return <div>
      <Button
        label={`${it.label} ($${it.costs})`}
        onButtonClick={() => onUpgrade(it)}
      />
    </div>
  }
};

const multiLevel = (it, onUpgrade) => {
  if (it.isDone) {
    return <div>{it.label} [MAX Lvl]</div>
  } else {
    return <div>
      <Button
        label={`${it.label} ($${it.costs[it.level]})`}
        onButtonClick={() => onUpgrade(it)}
      />
      [Lvl {it.level}/{it.actions.length}]
    </div>
  }
};

const research = (it, onUpgrade) => {
  if (it.isDone) {
    return null
  } else if (it.isRunning) {
    return <div>
      {`Researching: ${it.label} (${Math.floor(it.progress * 100)}%)`}
    </div>
  } else {
    return <div>
      <Button
        label={`Research: ${it.label} ($${it.costs})`}
        onButtonClick={() => onUpgrade(it)}
      />
    </div>
  }
};
