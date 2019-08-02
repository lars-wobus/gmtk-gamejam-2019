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
  }

  return <div id = "editorview">
    {createButtons(buttons)}
    -
    {createButtons(textfields)}
  </div>
};