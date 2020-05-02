import React, { useState } from 'react';

function Square(props) {
  let filledClass = '';
  if (props.firstTurn === 0) {
    if (props.square === 0) {
      filledClass = 'green';
    }
    if (props.square === 1) {
      filledClass = 'red';
    }
  }
  if (props.firstTurn === 1) {
    if (props.square === 1) {
      filledClass = 'green';
    }
    if (props.square === 0) {
      filledClass = 'red';
    }
  }
  return (
    <div onClick={() => { props.handleTurn(props.index); }} className={filledClass}>[ ]</div>
  );
}
export default Square;
