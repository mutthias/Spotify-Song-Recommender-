import './Homepage.css'
import lofigirl from '../Images/lofigirl.gif'
import React from 'react';

function Homepage() {
  return (
    <div class="gif-container">
        <div class="overlay"></div>
        <img src={lofigirl} alt="GIF"/>
      </div>
  )
}

export default Homepage;