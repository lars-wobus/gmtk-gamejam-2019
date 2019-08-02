import React from 'react';
import logo from './logo.svg';
import './App.css';

import {EditorView} from './components/editor-view';
import {ShopView} from './components/shop-view';

function App() {
  return (
    <div className="App">
      <EditorView />
      <ShopView />
    </div>
  );
}

export default App;
