import React from 'react';
import {Button} from './button';

export const ShopView = ({data={}}) => {
  
  const createButtons = (buttons) => {
    const index = 0;
    return buttons.map(element => {
      return <Button
        label={element.label}
        key={`${element.label}_${index}`}
      />
    });
  }

  return <div id = "shopview">
    Lorem Ipsum Dolor Sit Amet
    {createButtons(data.buttons)}
  </div>
};