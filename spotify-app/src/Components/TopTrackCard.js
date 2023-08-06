import React from 'react'
import './TopTrackCard.css'
import roy from '../Images/roymustang.jpg'


const TopTrackCard = () => {
  return (
    <div className='ttc_container'>
      <img className='ttc_img' src={roy}></img>
      <p className='ttc_trackname'>Track Name</p>
      <p className='ttc_artistname'>Artist Name</p>
    </div>
  )
}

export default TopTrackCard