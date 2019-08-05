import React from 'react';

export const Banner = ({ classes, text }) => {
  return <div className={`banner ${classes}`}>
    {text}
  </div>
};