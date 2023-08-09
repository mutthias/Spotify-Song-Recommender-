import React from 'react'
import './TopArtistCard.css'
import roy from '../Images/roymustang.jpg'


const TopArtistCard = ({artist, index}) => {
  return (
    <a className='tac_a' href={artist.uri}>
    <div className='tac_container'>
      <img className='tac_img' src={artist.images[0].url} alt=''></img>
      <p className='tac_name'>{index + 1}. {artist.name}</p>
    </div>
    </a>
  )
}

export default TopArtistCard