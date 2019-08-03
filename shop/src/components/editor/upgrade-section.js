import React from 'react';
import { UpgradeElement } from "./upgrade-element";

export const UpgradeSection = (
  {section, onUpgrade}
) => {
  if (!section.isVisible) return null;

  let upgrades = Object.keys(section.upgrades).map(upgradeName =>
    <div key={`upgrade-${upgradeName}`}>
      <UpgradeElement
        upgrade={section.upgrades[upgradeName]}
        onUpgrade={onUpgrade}
      />
    </div>
  );

  return <div>
    <div>{section.label}:</div>
    <div>{upgrades}</div>
  </div>
};

export const createUpgradeMap = (upgradeSections, onUpgrade) => {
  return Object.keys(upgradeSections).map(sectionName => {
    return <div key={`section-${sectionName}`}>
      <UpgradeSection
        section={upgradeSections[sectionName]}
        onUpgrade={onUpgrade}
      />
    </div>
  });
};
