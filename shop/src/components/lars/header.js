import React from 'react';

export const Header = ({ title, classes }) => {
  return <div className={`header ${classes}`}>
    {title}
  </div>
};