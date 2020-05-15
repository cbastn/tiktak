import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import SignUp from './SignUp';
import Game from './Game';

function LoadGame(props) {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(0);
  const [emptyPlayerTwo, setEmptyPlayerTwo] = useState(false);

  useEffect(() => {
    firebase.database().ref(props.gameCode).once('value').then((snapshot) => {
      if (snapshot.val().playerOne === props.userId) {
        setPlayer(1);
      }
      if (snapshot.val().playerTwo === props.userId) {
        setPlayer(2);
      }
      if (snapshot.val().playerTwo === '') {
        setEmptyPlayerTwo(true);
      }
      setLoading(false);
    });
  }, []);

  function checkPlayers() {
    if (player === 0) {
      return (
        <SignUp
          userId={props.userId}
          playerEmpty={emptyPlayerTwo}
          gameCode={props.gameCode}
          setPlayer={setPlayer}
        />
      );
    }
    return <Game player={player} gameId={props.gameCode} turn={props.turn} />;
  }
  return (
    <div>
      {loading ? <p>Loading</p> : checkPlayers()}
    </div>
  );
}

export default LoadGame;
