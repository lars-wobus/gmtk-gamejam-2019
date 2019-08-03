import React from 'react';

const headline="Headline";
const description=`Lorem ipsum dolor sit amet, consetetur sadipscing\
  elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\
  magna aliquyam erat, sed diam voluptua. At vero eos et accusam\
  et justo duo dolores et ea rebum. Stet clita kasd gubergren,\
  no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem\
  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam\
  nonumy eirmod tempor invidunt ut labore et dolore magna\
  aliquyam erat, sed diam voluptua. At vero eos et accusam et\
  justo duo dolores et ea rebum.`;

export const Dialog = (
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