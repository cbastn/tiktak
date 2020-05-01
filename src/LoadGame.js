import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import SignUp from './SignUp';
import Game from './Game';

function LoadGame(props) {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(0);
  const [emptyPlayerTwo, setEmptyPlayerTwo] = useState(false);
  const [docId, setDocId] = useState('');

  useEffect(() => {
    firebase.firestore().collection('games').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().gameId === props.gameCode && doc.data().playerOne === props.userId) {
          setPlayer(1);
        } else if (doc.data().gameId === props.gameCode && doc.data().playerTwo === props.userId) {
          setPlayer(2);
        }
        if (doc.data().gameId === props.gameCode && doc.data().playerTwo === '') {
          setEmptyPlayerTwo(true);
          console.log('player two is empty');
        }
        if (doc.data().gameId === props.gameCode) {
          setDocId(doc.id);
        }
      });
      setLoading(false);
    });
  }, [props.userId]);

  function checkPlayers() {
    console.log(player);
    if (player === 0) {
      return <SignUp userId={props.userId} playerEmpty={emptyPlayerTwo} docId={docId} setPlayer={setPlayer} />;
    }
    return <Game player={player} docId={docId} turn={props.turn} />;
  }
  return (
    <div>
      {loading ? <p>Loading</p> : checkPlayers()}
    </div>
  );
}

export default LoadGame;
