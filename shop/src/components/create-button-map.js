import React from 'react';
import { Button } from './button';

export const createButtonMap = (array, onButtonClick) => {
  let index = 0;
  return array.map(element => {
    const fixedIndex = index++;
    if (!element.is_visible) {
      return null;
    }
    return <Button
      label={element.label}
      key={`${element.label}_${fixedIndex}`}
      onButtonClick={onButtonClick}
    />
  });
};