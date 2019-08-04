import React from 'react';

export const TutorialDialog = (
  {
    data,
    onSkipButtonClick,
    onPreviousButtonClick,
    onNextButtonClick
  }
) => {
  const hasPredecessor = (data.hasPredecessor) ? "active" : "";
  const hasSuccessor = (data.hasSuccessor) ? "active" : ""

  return <div className="tutorial-background">
    <div className="tutorial-dialog">
      <h1>{data.headline}</h1>
      <h2>{data.subheader}</h2>
      <p className="description">{data.description}</p>
      <p className="note">{data.note}</p>
      <div 
        className={`skip-button`}
        onClick={() => onSkipButtonClick()}>
          {data.label_1}
      </div>
      <div
        className={`previous-button ${hasPredecessor}`}
        onClick={() => onPreviousButtonClick()}>
          {data.label_2}
      </div>
      <div
        className={`next-button ${hasSuccessor}`}
        onClick={() => onNextButtonClick()}>
          {data.label_3}
      </div>
    </div>
  </div>
};