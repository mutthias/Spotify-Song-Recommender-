import React, { useState } from 'react';
import { useEffect } from 'react';
import './SongCard.css';


import Player from './Player';

const SongCard = ({ recs, token, onTrackSelected }) => {

  const [uri, setURI] = useState('');

  useEffect(() => {
    const containers = document.querySelectorAll('.container');
    containers.forEach((container, index) => {
      setTimeout(() => {
        container.classList.add ('fade-in-slide-down');
      }, index * 100);
    });
  }, [recs]);

  const handlePlayClick = (uri) => {
    setURI(uri);
    console.log(uri)
  };

  return (
    <div>
      {recs.map((rec) => (
        <div className='container' key={rec.id}>
          <div className='songcard'>
            {rec.album.images.length ? (
              <img className='album_img' src={rec.album.images[0].url} alt='' />
            ) : (
              <div>No Image</div>
            )}
            <div className='song_info'>
              <div className='song_name'>{rec.name}</div>
              <div className='song_artists'>{rec.artists.map((artist) => artist.name).join(', ')}</div>
            </div>
            <div className='play_me' onClick={() => handlePlayClick(rec.uri)}>
              

            </div>
          </div>
        </div>
        
      ))}
      <div className='player_container'><Player accessToken={token} trackUri={uri}/></div>
      
      
    </div>
  );
}

export default SongCard;