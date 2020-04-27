import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

function Game(props) {
  const [turn, setTurn] = useState(props.turn);

  /*useEffect(() => {
    firebase.firestore().collection('games').doc(props.docId).onSnapshot((doc) => {
      console.log(doc.data().userTurn);
      setTurn(doc.data().userTurn);
    });
  },[turn]);
  function handleTurn() {
    if (props.player === 1 && turn === 0) {
      firebase.firestore().collection('games').doc(props.docId).update({
        userTurn: 1,
      });
    } else if (props.player === 2 && turn === 1) {
      firebase.firestore().collection('games').doc(props.docId).update({
        userTurn: 0,
      });
    }else {
      console.log('its not your turn');
    }
  };*/
  function handleTurn() {
    if (props.player === 1 && turn === 0) {
      setTurn(1);
    }else if(props.player === 2 && turn === 1){
      setTurn(0);
    }
  }
  return (
    <div>
      <p>{turn}</p>
      <p>{props.player}</p>
      <button onClick={()=> handleTurn()}>Change Turn</button>
    </div>
  );
}

export default Game;
