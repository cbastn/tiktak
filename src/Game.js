import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Square from './Square';
import LeftArrow from './img/leftArrow.svg';
import RightArrow from './img/rightArrow.svg';
import ShareButton from './ShareButton';

function Game(props) {
  const [turn, setTurn] = useState();
  const [firstTurn, setFirstTurn] = useState();
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
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
  function resetGame() {
    const randomTurn = Math.floor(Math.random() * Math.floor(2));
    setFirstTurn(randomTurn);
    firebase.database().ref(props.gameId).update({
      slots: Array(9).fill(3, 0, 9),
      moveX: [false],
      moveO: [false],
      firstTurn: randomTurn,
      userTurn: randomTurn,
      winner: false,
      drawGame: false,
    });
  }

  function checkWin(playerMoves) {
    const result = winCondition.some((combination) => combination.every((number) => playerMoves.includes(number)));
    if (result) {
      firebase.database().ref(props.gameId).update({
        winner: true,
      });
      setTimeout(resetGame, 3000);
    }
    // if result add point to scoreboard
    if (moveX.length === 5 && moveO.length === 5 && result === false) {
      firebase.database().ref(props.gameId).update({
        DrawGame: true,
      });
      setTimeout(resetGame, 3000);
    }
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
      setWin(snapshot.val().winner);
      setDraw(snapshot.val().drawGame);
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
  function renderHeader() {
    if (win) {
      if (turn) {
        return (
          <h1 className="p-3 text-6xl sm:text-8xl">
            Player 1 Wins!
          </h1>
        );
      }
      return (
        <h1 className="p-3 text-6xl sm:text-8xl">
          Player 2 Wins!
        </h1>
      );
    }
    if (draw) {
      return (
        <h1 className="p-3 text-6xl sm:text-8xl">
          Draw Game!
        </h1>
      );
    }
    return (
      <h1 className="p-3 text-6xl sm:text-8xl">
        Tik Tak Toe
      </h1>
    );
  }
  return (
    <>
      {renderHeader()}
      <div className="relative m-4">
        <img src={RightArrow} className={` align-text-bottom w-6 inline ${turn ? '' : 'filter-invert'}`} alt="right arrow" />
        {activePlayer()}
        <img src={LeftArrow} className={` align-text-bottom w-6 inline ${turn ? 'filter-invert' : ''}`} alt="left arrow" />
      </div>
      <div id="board" className="grid grid-cols-3  m-auto md:h-100 md:w-100 h-64 w-64">
        {/* eslint-disable-next-line max-len */}
        {slots.map((square, index) => <Square key={index} index={index} handleTurn={handleTurn} square={square} firstTurn={firstTurn} />)}
      </div>
      <ShareButton gameId={props.gameId} />
    </>
  );
}

export default Game;
