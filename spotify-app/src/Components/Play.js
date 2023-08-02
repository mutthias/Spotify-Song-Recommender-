import React, { useState } from 'react';
import Player from './Player';

const Play = ({ token, trackUri }) => {
  const [uri, setURI] = useState('');
  const handlePlayClick = (uri) => {
    setURI(uri);
  };

  return (
    <div className='player_container'>
      <Player accessToken={token} trackUri={trackUri} />
    </div>
  );
}

export default Play;
