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
    <div className="flex-col text-2xl md:text-4xl lg:text-4xl">
      <h1 className="p-3 text-6xl sm:text-8xl">
        Tik Tak Toe
      </h1>
      <p className="p-1 text-4xl">
        Game Code: {props.gameCode}
      </p>
      <button
        className="block m-auto mt-2 mb-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded"
        onClick={props.createGame}
      >
        Create Game
      </button>
      <p
        className="md:mr-24 sm:mr-0 text-4xl"
      >
        Enter Game Code:
      </p>
      <input
        className="text-black block m-auto sm:inline-block sm:m-auto mb-3"
        id="gamecodeInput"
        type="text"
        onChange={(event) => handleUserInput(event)}
        value={input}
      />
      <button
        className="m-auto ml-3 mt-1 mb-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
        onClick={toGame}
      >
        Join Game
      </button>
    </div>
  );
}

export default CreateGame;
