import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Square from './Square';
import LeftArrow from './img/leftArrow.svg';
import RightArrow from './img/rightArrow.svg';
import ShareButton from "./ShareButton";

function Game(props) {
  const [turn, setTurn] = useState();
  const [firstTurn, setFirstTurn] = useState();
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
  function checkWin(playerMoves) {
    const result = winCondition.some((combination) => combination.every((number) => playerMoves.includes(number)));
    console.log(result);
    // if result add point to scoreboard
  }
  useEffect(() => {
    firebase.database().ref(props.gameId).once('value')
      .then((snapshot) => {
        setTurn(snapshot.val().userTurn);
        setFirstTurn(snapshot.val().firstTurn);
        setSlots(snapshot.val().slots);
      });
  }, []);

  useEffect(() => {
    firebase.database().ref(props.gameId).on('value', (snapshot) => {
      setTurn(snapshot.val().userTurn);
      setSlots(snapshot.val().slots);
      setMoveO(Object.values(snapshot.val().moveO));
      setMoveX(Object.values(snapshot.val().moveX));
    });
  }, [turn]);
  function handleTurn(index) {
    const changedSlots = [...slots];
    if (changedSlots[index] === 3) {
      if (props.player === 1 && turn === 0) {
        changedSlots[index] = 0;
        const changeMoveX = [...moveX, index];
        checkWin(changeMoveX);
        firebase.database().ref(props.gameId).update({
          userTurn: 1,
          slots: changedSlots,
          moveX: changeMoveX,
        });
      } else if (props.player === 2 && turn === 1) {
        changedSlots[index] = 1;
        const changeMoveO = [...moveO, index];
        checkWin(changeMoveO);
        firebase.database().ref(props.gameId).update({
          userTurn: 0,
          slots: changedSlots,
          moveO: changeMoveO,
        });
      } else {
        console.log('its not your turn');
      }
    }
  }

  function resetGame() {
    const randomTurn = Math.floor(Math.random() * Math.floor(2));
    setFirstTurn(randomTurn);
    firebase.database().ref(props.gameId).update({
      slots: Array(9).fill(3, 0, 9),
      moveX: [false],
      moveO: [false],
      firstTurn: randomTurn,
      userTurn: randomTurn,
    });
  }
  function activePlayer() {
    if (props.player === 1) {
      return (
        <>
          <p className="player inline text-2xl p-2">Player 1 </p>
          <p className="notPlayer inline text-2xl p-2">Player 2 </p>
        </>
      );
    }
    return (
      <>
        <p className="notPlayer inline text-2xl p-2">Player 1 </p>
        <p className="player inline text-2xl p-2"> Player 2</p>
      </>
    );
  }
  return (
    <>
      <h1 className="p-3 text-6xl sm:text-8xl">
        Tik Tak Toe
      </h1>
      <div className="relative">
        <img src={RightArrow} className={` align-text-bottom w-6 inline ${turn ? '' : 'filter-invert'}`} alt="user" />
        {activePlayer()}
        <img src={LeftArrow} className={` align-text-bottom w-6 inline ${turn ? 'filter-invert' : ''}`} alt="user" />
      </div>
      <div id="board" className="grid grid-cols-3  m-auto h-64 w-64">
        {/* eslint-disable-next-line max-len */}
        {slots.map((square, index) => <Square key={index} index={index} handleTurn={handleTurn} square={square} firstTurn={firstTurn} />)}
      </div>
      <ShareButton gameId={props.gameId}/>
    </>
  );
}

export default Game;
