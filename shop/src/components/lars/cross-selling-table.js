import React from 'react';

import ProductImage from '../../images/plumbus.png';

export const CrossSellingTable = () => {
  return <div id="cross-selling-info">
    Customers of this product also bought this
    <div className="cross-selling-table">
      
      <div className="comparison">
        <img
          className="rendering"
          src={ProductImage}
          alt="Rendering of a Plumbus"
        />
        Plumbus
      </div>
      <div className="comparison">
        <img
          className="rendering"
          src={ProductImage}
          alt="Rendering of a Plumbus"
        />
        Plumbus
      </div>
      <div className="comparison">
        <img
          className="rendering"
          src={ProductImage}
          alt="Rendering of a Plumbus"
        />
        Plumbus
      </div>
      <div className="comparison">
        <img
          className="rendering"
          src={ProductImage}
          alt="Rendering of a Plumbus"
        />
        Plumbus
      </div>
      <div className="comparison">
        <img
          className="rendering"
          src={ProductImage}
          alt="Rendering of a Plumbus"
        />
        Plumbus
      </div>
    </div>
  </div>
};
