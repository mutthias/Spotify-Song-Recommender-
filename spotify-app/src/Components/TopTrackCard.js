import React from 'react'
import './TopTrackCard.css'
import roy from '../Images/roymustang.jpg'


const TopTrackCard = ({song, index}) => {
  const artistNames = song.artists.map(artist => artist.name).join(', ');
  return (
    <a className='ttc_a' href={song.uri}>
    <div className='ttc_container'>
      <img className='ttc_img' src={song.album.images[0].url} alt=''></img>
      <p className='ttc_trackname'>{index + 1}. {song.name}</p>
      <p className='ttc_artistname'>{artistNames}</p>
    </div>
    </a>
  )
}

export default TopTrackCard