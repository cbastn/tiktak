import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Square from './Square';

function Game(props) {
  const [turn, setTurn] = useState(props.turn);
  const [move, setMove] = useState([]);
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const slots = Array(9).fill(0, 0, 9);
  /* useEffect(() => {
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
  }; */
  function handleTurn(squareNumber) {
    if (props.player === 1 && turn === 0) {
      setTurn(1);
      setMove((move) => [...move, squareNumber]);
    } else if (props.player === 2 && turn === 1) {
      setTurn(0);
      setMove((move) => [...move, squareNumber]);
    }
    console.log(move);
  }
  function checkWin() {
    const moves = [0, 1, 6];

    const result = winCondition.some((combination) => combination.every((number) => moves.includes(number)));
    console.log(result);
  }
  return (
    <div>
      <p>{turn}</p>
      <p>{props.player}</p>
      <button onClick={() => handleTurn(1)}>Change Turn</button>
      <button onClick={() => checkWin()}>Check Win</button>
      <div id="board">
        {slots.map((square, index) => <Square key={index} index={index}/>)}
      </div>
    </div>
  );
}

export default Game;
