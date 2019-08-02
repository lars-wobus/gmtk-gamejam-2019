import React from 'react';
import {Button} from './button';

export const EditorView = (
  { buttons=[], textfields=[], onButtonClick }
) => {
  const createButtons = (buttons) => {
    const index = 0;
    return buttons.map(element => {
      if (!element.is_visible) {
        return null;
      }
      return <Button
        label={element.label}
        key={`${element.label}_${index}`}
        onButtonClick={onButtonClick}
      />
    });
  };

  const createTextfield = (textfields) => {
    let index = 0;
    return textfields.map(element => {
      index += 2;
      const fixedIndex = index;
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

  return <div id = "editorview">
    {createButtons(buttons)}
    {createTextfield(textfields)}
  </div>
};