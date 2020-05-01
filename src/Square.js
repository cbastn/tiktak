import React, { useState } from 'react';

function Square(props) {

  let filledClass = '';

  if(props.square === 0){
    filledClass = 'green';
  }
  if(props.square === 1){
    filledClass = 'red';
  }
  return (
    <div onClick={() => { props.handleTurn(props.index); }} className={filledClass}>[ ]</div>
  );
}
export default Square;
