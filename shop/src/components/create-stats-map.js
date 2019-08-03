import React from 'react';
import { StatsElement } from "./editor/stats-element";

export const createStatsMap = (stats) => {
  return Object.keys(stats).map(statsId => {
    return <StatsElement
      statsId={statsId}
      statsData={stats[statsId]}
    />
  });
};
