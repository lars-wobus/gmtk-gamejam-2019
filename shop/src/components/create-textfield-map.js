import React from 'react';
import { Button } from './button';

export const createTextfieldMap = (textfields) => {
  let index = 0;
  return textfields.map(element => {
    const fixedIndex = index++;
    if (!element.is_visible) {
      return null;
    }
    return <div key = {`${element.label}_${fixedIndex}`}>
      <Button
        label={element.label}
      />
      <Button
        label='?'
      />
    </div>
  });
};