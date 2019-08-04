import React from 'react';

export const StatsElement = (
  {statsId, statsData}
) => {
  if (!statsData || !statsData.statVisible) return null;

  let name = statsData.name || statsId;
  let value = statsData.value || 0;
  let cap = statsData.cap || 0;
  if (statsData.cap !== null && value > cap) value = cap;
  let rate = statsData.rate || 0;
  let rateCap = statsData.rateCap || 0;
  if (statsData.rateCap !== null && rate > rateCap) rate = rateCap;
  if (statsData.displayType === "percent") {
    value = `${value}%`;
    cap = `${cap}%`;
    rate = `${rate}%`;
    rateCap = `${rateCap}%`;
  }

  let valueString = "";
  if (statsData.valueVisible) {
    valueString += value;
    if (statsData.capVisible) valueString += " / " + cap
  }

  let rateString = "";
  if (statsData.rateVisible) {
    rateString += rate + "/sec";
    if (statsData.rateCapVisible) rateString += ` (max: ${rateCap}/sec)`
  }

  return <div className = "stats-element">
    <div id = "stats-element-name">{name}:</div>
    <div id = "stats-element-value">{valueString}</div>
    <div id = "stats-element-rate">{rateString}</div>
  </div>
};
