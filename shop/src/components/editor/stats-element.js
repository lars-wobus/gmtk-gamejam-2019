import React from 'react';

export const StatsElement = (
  {data}
) => {
  if (!data || !data.statVisible) return "";

  let name = data.name || data.id;
  let value = data.value || 0;
  let cap = data.cap || 0;
  if (data.cap !== null && value > cap) value = cap;
  let rate = data.rate || 0;
  let rateCap = data.rateCap || 0;
  if (data.rateCap !== null && rate > rateCap) rate = rateCap;
  if (data.displayType === "percent") {
    value = "" + value + "%";
    cap = "" + cap + "%";
    rate = "" + rate + "%";
    rateCap = "" + rateCap + "%";
  }

  let valueString = "";
  if (data.valueVisible) {
    valueString += value;
    if (data.capVisible) valueString += " / " + cap
  }

  let rateString = "";
  if (data.rateVisible) {
    rateString += rate + "/sec";
    if (data.rateCapVisible) rateString += " (max: " + rateCap + "/sec)"
  }

  return <div id = "stats-element">
    <div id = "stats-element-name">{name}:</div>
    <div id = "stats-element-value">{valueString}</div>
    <div id = "stats-element-rate">{rateString}</div>
  </div>
};
