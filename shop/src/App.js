import React from 'react';
import logo from './logo.svg';
import './App.css';

import { EditorView } from './components/editor-view';
import { ShopView } from './components/shop-view';

import shopData from './data/shop-data';

function App() {
  return (
    <div className="App">
      <EditorView />
      <ShopView data={shopData}/>
    </div>
  );
}

export default App;
