import './Homepage.css'
import lofigirl from '../Images/lofigirl.gif'

import React from 'react';

function Homepage() {
  return (
    <div>
      

      <div className="gif-container">
        <div className="overlay"></div>
        <img src={lofigirl} alt="GIF"/>
      </div>

      <div className='About'>
        <h1>What is this site for?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed cursus faucibus mauris, vitae efficitur sem bibendum in. 
          Mauris sed tincidunt lorem. Sed non fringilla leo. 
          Fusce id ligula nec nulla scelerisque pulvinar. 
          Sed vehicula risus vitae urna mollis auctor. 
          Nam eget tortor nec turpis finibus efficitur. 
          Proin semper diam et elit consectetur, nec viverra turpis aliquam. 
          Curabitur consequat interdum augue, a tincidunt leo consectetur eget.</p>
          <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
          cubilia curae; Mauris feugiat rutrum congue. Pellentesque suscipit, metus 
          id egestas suscipit, lectus erat lobortis est, nec tristique enim risus 
          vitae mi. Ut vel condimentum turpis, eget gravida turpis. 
          Donec suscipit purus a efficitur venenatis.
          </p>
      </div>
    </div>
  )
}

export default Homepage;