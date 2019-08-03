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
    default:
      console.error(`cannot render upgrade "${upgrade.name}": unknown upgrade type "${upgrade.type}"!`);
      return null;
  }
};

const normal = (it, onUpgrade) => {
  if (it.isDone) {
    return <div>Active: {it.label}</div>
  } else {
    return <div>
      <Button
        label={it.label}
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
        label={it.label}
        onButtonClick={() => onUpgrade(it)}
      />
      [Lvl {it.level}/{it.actions.length}]
    </div>
  }
};
