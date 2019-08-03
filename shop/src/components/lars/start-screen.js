import React from 'react';

export const Startscreen = (
  { onButtonClick, onTextInputChange }
) => {
  return <div className="center">
    <input
      type="text"
      defaultValue="PlumbusStore"
      onChange={onTextInputChange}
    />
    <div
      className="startbutton"
      onClick={onButtonClick}
    >Open New Shop</div>
  </div>
};