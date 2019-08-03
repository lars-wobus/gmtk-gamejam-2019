import React from 'react';
import { createButtonMap } from './create-button-map';
import { createTextfieldMap } from './create-textfield-map';
import { createStatsMap } from "./create-stats-map";

export const EditorView = (
  {stats, buttons = [], textfields = [], onButtonClick}
) => {
  return <div id="editorview">
    {createStatsMap(stats)}
    {createButtonMap(buttons, onButtonClick)}
    {createTextfieldMap(textfields)}
  </div>
};
