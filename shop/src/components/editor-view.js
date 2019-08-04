import React from 'react';
import { createStatsMap } from "./create-stats-map";
import { createUpgradeMap } from "./editor/upgrade-section";

export const EditorView = (
  {stats, upgradeSections, onUpgrade}
) => {
  return <div id="editorview">
    <div className = "stats-element">{createStatsMap(stats)}</div>
    {createUpgradeMap(upgradeSections, onUpgrade)}
  </div>
};
