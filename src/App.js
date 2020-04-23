import React, { useState, useEffect } from 'react';
import {
  Switch, Route, useHistory, useLocation,
} from 'react-router-dom';
import firebase, { authenticateAnonymously } from './firebase';
import './App.css';
import CreateGame from './CreateGame';
import Game from './Game';


function App() {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [path, setPath] = useState();
  const history = useHistory();
  const location = useLocation();

  function generateNumber() {
    const randomNum = Math.random().toString(36).substring(7);
    setPath(randomNum);
  }

  const createGame = () => {
    if (userName === undefined || userName === ' ') {
      // TODO: add popup asking for username
      console.log('Please enter a username');
    } else {
      history.push(`/${path}`);
      firebase.firestore().collection('games').doc().set({
        gameId: path,
        uId: userId,
        user: userName,
      });
    }
  };
  function joinGame(gameCode) {
    let gameExists = false;
    firebase.firestore().collection('games').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().gameId === gameCode) {
          setPath(gameCode);
          history.push(`/${gameCode}`);
          gameExists = true;
        }
      });
      if (!gameExists) {
        console.log('game does not exist');
        history.push('/');
      }
    });
  }
  useEffect(() => {
    authenticateAnonymously().then((useCredential) => {
      setUserId(useCredential.user.uid);
    });
  });
  useEffect(() => {
    generateNumber();
  }, []);
  useEffect(() => {
    if (location.pathname !== '/' && (location.pathname.replace('/', '') !== path)) {
      joinGame(location.pathname.replace('/', ''));
    }
  }, [location.pathname]);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <CreateGame
            gameCode={path}
            joinGame={joinGame}
            createGame={createGame}
            setUserName={setUserName}
            userName={userName}
          />
        </Route>
        <Route path={`/${path}`} exact>
          <Game />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
