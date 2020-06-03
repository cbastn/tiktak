import React from 'react';
import firebase from './firebase';

function SignUp(props) {

  function joinGame() {
    if (props.playerEmpty) {
      firebase.database().ref(props.gameCode).update({
        playerTwo: props.userId,
        userTwo: 'Player 2',
      });
      props.setPlayer(2);
    }
  }
  return (
    <div className="text-4xl">
      <p className="m-6">Welcome Player 2</p>
      <button
        className="m-auto ml-3 mt-1 mb-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
        onClick={joinGame}>Join Game</button>
    </div>
  );
}

export default SignUp;
