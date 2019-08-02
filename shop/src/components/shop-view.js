import React from 'react';
import { createButtonMap } from './create-button-map';

export const ShopView = (
  { buttons=[] }
) => {
  return <div id = "shopview">
    {createButtonMap(buttons)}
  </div>
};