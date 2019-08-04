import React from 'react';
import { noop } from '../utils/noop';

export const Button = (
  {label="Buy", onButtonClick=noop, classes="button" }
) => {
  return <div className={classes} onClick={onButtonClick}>
    {label}
  </div>
};