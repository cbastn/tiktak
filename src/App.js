import React, { useState, useEffect } from 'react';
import {
  Switch, Route, useHistory, useLocation,
} from 'react-router-dom';
import firebase, { authenticateAnonymously } from './firebase';
import CreateGame from './CreateGame';
import LoadGame from './LoadGame';


function App() {
  const [userId, setUserId] = useState();
  const [path, setPath] = useState();
  const [turn, setTurn] = useState();
  const history = useHistory();
  const location = useLocation();

  function generateNumber() {
    const randomNum = Math.random().toString(36).substring(7);
    setPath(randomNum);
  }

  const createGame = () => {
    history.push(`/${path}`);
    const newTurn = Math.floor(Math.random() * Math.floor(2));
    setTurn(newTurn);

    firebase.database().ref(path).set({
      gameId: path,
      playerOne: userId,
      playerTwo: '',
      userOne: 'Player One',
      userTwo: '',
      userTurn: newTurn,
      firstTurn: newTurn,
      slots: Array(9).fill(3, 0, 9),
      moveX: [false],
      moveO: [false],
      winner: false,
      drawGame: false,
    });
  };
  function joinGame(gameCode) {
    try {
      firebase.database().ref(gameCode).once('value').then((snapshot) => {
        if (snapshot.val()) {
          setPath(gameCode);
          history.push(`/${gameCode}`);
        } else {
          console.log('no game id');
        }
      });
    } catch (e) {
      console.log('no game found');
    }
  }
  useEffect(() => {
    authenticateAnonymously().then((useCredential) => {
      setUserId(useCredential.user.uid);
    });
  }, []);
  useEffect(() => {
    generateNumber();
  }, []);
  useEffect(() => {
    if (location.pathname !== '/' && (location.pathname.replace('/', '') !== path)) {
      joinGame(location.pathname.replace('/', ''));
    }
  }, [location.pathname]);
  return (
    <div className="App bg-black text-white h-screen flex flex-col justify-center">
      <Switch>
        <Route path="/" exact>
          <CreateGame
            gameCode={path}
            joinGame={joinGame}
            createGame={createGame}
          />
        </Route>
        <Route path={`/${path}`} exact>
          <LoadGame turn={turn} setTurn={setTurn} gameCode={path} userId={userId} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
