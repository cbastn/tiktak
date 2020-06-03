import React from 'react';

function Square(props) {
  let filledClass = ' cell ';
  if (props.firstTurn === 0) {
    if (props.square === 0) {
      filledClass += ' xCell ';
    }
    if (props.square === 1) {
      filledClass += ' circle ';
    }
  }
  if (props.firstTurn === 1) {
    if (props.square === 1) {
      filledClass += ' xCell ';
    }
    if (props.square === 0) {
      filledClass += ' circle ';
    }
  }

  return (
    <div onClick={() => { props.handleTurn(props.index); }} className={filledClass}/>
  );
}
export default Square;
