import React from 'react';
import { noop } from '../utils/noop';

export const Button = (
  {label = "Buy", onButtonClick = noop}
) => {
  return <div id = "buy" onClick={onButtonClick}>
    {label}
  </div>
};