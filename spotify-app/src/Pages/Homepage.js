import React from 'react';
import './Homepage.css'
import { FaSearch } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import Player from '../Components/Player';
import lofigirl from '../Images/lofigirl.gif'



const Homepage = ({searchTracks, setSearchKey, searchKey, token, recs}) => {

  useEffect(() => {
    const containers = document.querySelectorAll('.container');
    containers.forEach((container, index) => {
      setTimeout(() => {
        container.classList.add ('fade-in-slide-down');
      }, index * 100);
    });
  }, [recs]);

  const [uri, setURI] = useState('');
  const handlePlayClick = (uri) => {
    setURI(uri);
    console.log(uri)
  };

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
                    <FaPlayCircle  size={20}/>
                  </div>
                </div>
              </div>
            
            ))}
          </div>
        </form>
        <div className='player'> <Player accessToken={token} trackUri={uri}/></div>
        
      </div>

      {/* <Player accessToken={token} trackUri={'spotify:track:2yjDmSX8ukT00SXmRs04T6'}/> */}

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

      </div>
    </div>
  )
}

export default Homepage;