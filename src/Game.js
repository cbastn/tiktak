import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Square from './Square';

function Game(props) {
  const [turn, setTurn] = useState();
  const [moveX, setMoveX] = useState([]);
  const [moveO, setMoveO] = useState([]);
  const [slots, setSlots] = useState([]);
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

  // let slots = Array(9).fill(3,0,9);

  useEffect(() => {
    firebase.firestore().collection('games').doc(props.docId).get()
      .then((doc) => {
        setTurn(doc.data().userTurn);
        setSlots(doc.data().slots);
      });
  }, []);

  useEffect(() => {
    firebase.firestore().collection('games').doc(props.docId).onSnapshot((doc) => {
      setTurn(doc.data().userTurn);
      setSlots(doc.data().slots);
      setMoveX(doc.data().moveX);
      setMoveO(doc.data().moveO);
    });
  }, [turn]);
  function handleTurn(index) {
    const changedSlots = [...slots];

    if (props.player === 1 && turn === 0) {
      changedSlots[index] = 0;
      const changeMoveX = [...moveX, index];
      checkWin(changeMoveX);
      firebase.firestore().collection('games').doc(props.docId).update({
        userTurn: 1,
        slots: changedSlots,
        moveX: changeMoveX,
      });
    } else if (props.player === 2 && turn === 1) {
      changedSlots[index] = 1;
      const changeMoveO = [...moveO];
      checkWin(changeMoveO);
      firebase.firestore().collection('games').doc(props.docId).update({
        userTurn: 0,
        slots: changedSlots,
        moveO: changeMoveO,
      });
    } else {
      console.log('its not your turn');
    }
  }
  function checkWin(playerMoves) {
    const result = winCondition.some((combination) => combination.every((number) => playerMoves.includes(number)));
    console.log(result);
  }

  return (
    <div>
      <p>{turn}</p>
      <p>{props.player}</p>
      <button onClick={() => handleTurn(1)}>Change Turn</button>
      <button onClick={() => checkWin()}>Check Win</button>
      <div id="board">
        {/* eslint-disable-next-line max-len */}
        {slots.map((square, index) => <Square key={index} index={index} handleTurn={handleTurn} square={square} />)}
      </div>
    </div>
  );
}

export default Game;
