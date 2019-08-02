import React, { useState } from 'react';
import './App.css';

import { EditorView } from './components/editor-view';
import { ShopView } from './components/shop-view';

import editorData from './data/editor-data';
import shopData from './data/shop-data';

function App() {
  const [shopButtons, setShopButtons] = useState(shopData.buttons);


  const addButtonToShop = () => {
    setShopButtons([...shopButtons, {
      "label": "Another Button",
      "is_visible": true,
      "css_id": null,
      "css_classes": "simple-button"
    }]);
  };

  const onButtonClick = () => {
    console.log('Button was clicked');
    addButtonToShop();
  };

  return (
    <div className="App">
      <EditorView
        data={editorData}
        onButtonClick={onButtonClick}
      />
      <ShopView buttons={shopButtons}/>
    </div>
  );
}

export default App;
