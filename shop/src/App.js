import React from 'react';
import './App.css';

import { EditorView } from './components/editor-view';
import { ShopView } from './components/shop-view';

import editorData from './data/editor-data';
import shopData from './data/shop-data';

function App() {
  return (
    <div className="App">
      <EditorView data={editorData}/>
      <ShopView data={shopData}/>
    </div>
  );
}

export default App;
