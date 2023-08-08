import React from 'react'
import './TopTrackCard.css'
import roy from '../Images/roymustang.jpg'


const TopTrackCard = ({song}) => {
  const artistNames = song.artists.map(artist => artist.name).join(', ');
  return (
    <div className='ttc_container'>
      <img className='ttc_img' src={song.album.images[0].url} alt=''></img>
      <p className='ttc_trackname'>{song.name}</p>
      <p className='ttc_artistname'>{artistNames}</p>
    </div>
  )
}

export default TopTrackCard