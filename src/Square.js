import React from 'react';

function Square(props) {
  return (
    <div onClick={() => { console.log(props.index); }} >Hello</div>
  );
}
export default Square;
