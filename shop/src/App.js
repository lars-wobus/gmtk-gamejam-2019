import React, { useState } from 'react';
import './App.css';
import './styles/tutorial-dialog.css';
import './styles/user-reviews.css';

import { Startscreen } from './components/lars/start-screen';
import { TutorialDialog } from './components/lars/tutorial-dialog';
import { EditorView } from './components/editor-view';
import { ShopView } from './components/shop-view';

import { sortElementsByType } from './utils/sort-elements-by-type';

import settings from './config/default-settings'
import editorData from './data/editor-data';
import statsData from './data/stats-data';
import shopData from './data/shop-data';
import tutorialData from './data/tutorial-data';

const editorElements = sortElementsByType(editorData);

function App() {
  const [showStartscreen, setShowStartscreen] = useState(settings.show_startscreen);
  const [showTutorialDialog, setShowTutorialDialog] = useState(settings.show_tutorial);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [shopName, setShopName] = useState(settings.default_shop_name);
  const [stats] = useState(statsData);
  const [editorButtons] = useState(editorElements.buttons);
  const [editorTextfields] = useState(editorElements.textfields);
  const [shopButtons, setShopButtons] = useState(shopData.buttons);

  const onSkipButtonClick = () => {
    setShowTutorialDialog(false);
  }

  const onPreviousButtonClick = () => {
    setTutorialIndex(tutorialIndex - 1);
  };

  const onNextButtonClick = () => {
    setTutorialIndex(tutorialIndex + 1);
  };

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
      { showStartscreen
         ? <Startscreen
          defaultValue={settings.default_shop_name}
          onButtonClick={() => setShowStartscreen(false)}
          onTextInputChange={(event) => {setShopName(event.target.value);}}
         />
         : <>
          <>
            <EditorView
              stats={stats}
              buttons={editorButtons}
              textfields={editorTextfields}
              onButtonClick={onButtonClick}
            />
            <ShopView buttons={shopButtons} />
          </>
          {
            showTutorialDialog &&
            <TutorialDialog
              data={tutorialData[tutorialIndex]}
              onSkipButtonClick={() => onSkipButtonClick()}
              onPreviousButtonClick={() => onPreviousButtonClick()}
              onNextButtonClick={() => onNextButtonClick()}
            />}
        </>
      }
    </div>
  );
}

export default App;
