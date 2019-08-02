import React from 'react';
import { createButtonMap } from './create-button-map';
import { createTextfieldMap } from './create-textfield-map';

export const EditorView = (
  { buttons=[], textfields=[], onButtonClick }
) => {
  return <div id = "editorview">
    {createButtonMap(buttons, onButtonClick)}
    {createTextfieldMap(textfields)}
  </div>
};