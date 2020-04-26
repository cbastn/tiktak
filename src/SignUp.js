import React, { useState } from 'react';
import firebase from './firebase';


function SignUp(props) {
  const [userName, setUsername] = useState('');

  function joinGame() {
    if (props.playerEmpty) {
      firebase.firestore().collection('games').doc(props.docId).update({
        playerTwo: props.userId,
        userTwo: userName,
      });
      props.setPlayer(2);
    }
  }
  return (
    <div>
      <input type="text" onChange={((event) => { setUsername(event.target.value); })} />
      <button onClick={joinGame}>Join Game</button>
    </div>
  );
}

export default SignUp;
