import React from 'react';

export const Startscreen = (
  { defaultValue, onButtonClick, onTextInputChange }
) => {
  return <div className="center">
    <input
      type="text"
      defaultValue={defaultValue}
      onChange={onTextInputChange}
    />
    <div
      className="startbutton"
      onClick={onButtonClick}
    >Open New Shop</div>
  </div>
};