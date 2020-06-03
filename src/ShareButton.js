import React, { useState } from 'react';
import Copy from './img/copy.svg';

export default function ShareButton(props) {
  const [copy, setCopy] = useState(false);
  const shareData = {
    title: 'Tik Tak Toe',
    text: 'Join me for a game!',
    url: `https://tiktaktoe.now.sh/#/${props.gameId}`,
  };

  function mobileShare() {
    return (
      <button
        className="border-2 border-gray-700 pl-8 pr-8 pt-1 pb-1 text-2xl mt-16 rounded"
        onClick={() => navigator.share(shareData).then(setCopy(true))}
      >
        Share
      </button>
    );
  }
  function desktopShare() {
    return (
      <>
        <p>Share:</p>
        <div
          onClick={() => navigator.clipboard.writeText(shareData.url).then(setCopy(true))}
          className="share p-2 m-2 inline-block border-2 border-gray-700 hover:border-green-900 hover:bg-green-500"
        >
          {shareData.url}
          <img src={Copy} className="filter-invert w-4 ml-2 inline" alt="user" />
        </div>
      </>
    );
  }
  function renderShare() {
    return navigator.share ? mobileShare() : desktopShare();
  }
  return (
    <>
      {renderShare()}
      <div>
        <p className={`text-sm text-gray-200 ${copy ? 'visible' : 'invisible'}`}>Link Copied to Clipboard!</p>
      </div>
    </>
  );
}
