import axios from 'axios';
import './Homepage.css'
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Player from '../Components/Player';
import Auth from '../Components/Auth';


import lofigirl from '../Images/lofigirl.gif'

import React from 'react';

const Homepage = ({searchTracks, setSearchKey, searchKey, renderRecs, token}) => {
  return (
    <div className='Homepage'>
    
      <div className="gif-container">
        <div className="overlay"></div>
        <img src={lofigirl} alt="GIF"/>
        
        <form className='search' onSubmit={searchTracks}>
        <div className="search-text">Enter any tracks, instantly get others similar to it!</div>
          <div className='Bar'>
            <input placeholder='Search for any song...' className='search_bar' type='text' onChange={e => setSearchKey(e.target.value)}/>
            <button className='search_button' type={'submit'} disabled={!searchKey.trim()}><FaSearch color="#fff" size={20}/></button>
          </div>
          <div className="results">
            {renderRecs()}
          </div>
        </form>

      </div>

      <Player token={token}/>

      <div className='About'>
        <h1>Site Usage</h1>
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

      <div>
        <Auth/>
      </div>
    </div>
  )
}

export default Homepage;