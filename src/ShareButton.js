import React from 'react';

export default function ShareButton(props) {
  const shareData = {
    title: 'Tik Tak Toe',
    text: 'Join me for a game!',
    url: `https://tiktaktoe.now.sh/#/${props.gameId}`,
  };

  function mobileShare(){
    return <button onClick={() => navigator.share(shareData)}> Share </button>;
  }
  function desktopShare(){
    return <span onClick={() => navigator.clipboard.writeText(shareData.url)}>{shareData.url}</span>;
  }
  function renderShare() {
    return navigator.share ? mobileShare() : desktopShare();
  }
  return (
      <>
        {renderShare()}
      </>
  );
}
