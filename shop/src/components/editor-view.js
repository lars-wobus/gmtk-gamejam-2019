import React from 'react';
import { createButtonMap } from './create-button-map';
import { createTextfieldMap } from './create-textfield-map';
import { StatsElement } from "./editor/stats-element";

export const EditorView = (
  {stats, buttons = [], textfields = [], onButtonClick}
) => {
  return <div id = "editorview">
    <StatsElement data = {stats[1]}/>
    {createButtonMap(buttons, onButtonClick)}
    {createTextfieldMap(textfields)}
  </div>
};
