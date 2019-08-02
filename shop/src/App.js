import React from 'react';
import './App.css';

import { EditorView } from './components/editor-view';
import { ShopView } from './components/shop-view';

import editorData from './data/editor-data';
import shopData from './data/shop-data';

function App() {
  const onButtonClick = () => {
    console.log('Button was clicked');
  }

  return (
    <div className="App">
      <EditorView
        data={editorData}
        onButtonClick={onButtonClick}
      />
      <ShopView data={shopData}/>
    </div>
  );
}

export default App;
