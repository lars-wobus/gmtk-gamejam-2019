import React from 'react';

export const Message = () => {
  const style = {
    width: "24px",
    height: "24px"
  }
  return <svg style={style} viewBox="0 0 24 24">
    <path fill="#000000" d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" />
  </svg>
};