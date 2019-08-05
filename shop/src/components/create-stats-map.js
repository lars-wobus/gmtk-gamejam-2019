import React from 'react';
import { StatsElement } from "./editor/stats-element";

export const createStatsMap = (stats) => {
  return Object.keys(stats).map(statsId => {
    return <div key={`stat-${statsId}`}>
      <StatsElement
        statsId={statsId}
        statsData={stats[statsId]}
      />
    </div>
  });
};
