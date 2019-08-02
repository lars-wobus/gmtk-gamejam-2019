import React from 'react';
import {Button} from './button';

export const ShopView = ({buttons=[]}) => {
  
  const createButtons = (buttons) => {
    let index = 0;
    return buttons.map(element => {
      const fixedIndex = index++;
      if (!element.is_visible) {
        return null;
      }
      return <Button
        label={element.label}
        key={`${element.label}_${fixedIndex}`}
      />
    });
  }

  return <div id = "shopview">
    Lorem Ipsum Dolor Sit Amet
    {createButtons(buttons)}
  </div>
};