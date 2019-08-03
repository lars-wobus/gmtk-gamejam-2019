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
      <p>{data.description}</p>
      <div 
        className={`skip-button`}
        onClick={() => onSkipButtonClick()}>
          Skip tutorial
      </div>
      <div
        className={`previous-button ${hasPredecessor}`}
        onClick={() => onPreviousButtonClick()}>
          Previous
      </div>
      <div
        className={`next-button ${hasSuccessor}`}
        onClick={() => onNextButtonClick()}>
          Next
      </div>
    </div>
  </div>
};