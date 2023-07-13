import React from 'react';
import './SongCard.css';

const SongCard = ({ rec }) => {
  const imageUrl = rec?.album?.images?.[0]?.url ?? "";
  const songName = rec?.name ?? "";
  const songId = rec?.id ?? "";

  return (
    <div key={songId}>
      <img width={'1%'} src={imageUrl} alt=''/> : <div>No Image</div> 
      {songName}
    </div>
  );
}

export default SongCard;