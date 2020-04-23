import React, { useState } from 'react';

function CreateGame(props) {
  const [gameCode, setGameCode] = useState();
  const [input, setInput] = useState('');

  const toGame = () => {
    props.joinGame(gameCode);
    // TODO: Needs to be awaited so input is cleared after game code is checked
    setInput('');
  };
  const handleUserInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    setGameCode(event.target.value);
  };
  return (
    <div>
      <p>{props.userName}</p>
      <input type="text" name="username" onChange={(event) => { props.setUserName(event.target.value); }} />
      <p>{props.gameCode}</p>
      <button onClick={props.createGame}>Create Game</button>
      <p>Enter Game Code</p>
      <input id="gamecodeInput" type="text" onChange={(event) => handleUserInput(event)} value={input} />
      <button onClick={toGame}>Join Game</button>
    </div>
  );
}

export default CreateGame;
