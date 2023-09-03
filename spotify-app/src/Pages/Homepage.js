import React from 'react';
import './Homepage.css'
import { FaSearch } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import Player from '../Components/Player';
import lofigirl from '../Images/lofigirl.gif'
import Navbar from '../Components/Navbar';



const Homepage = ({searchTracks, setSearchKey, searchKey, token, recs, login}) => {

  const [pfp, setPfp] = useState([]);

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
      <Navbar token={token} login={login} style={{ position: 'absolute' }} />
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
        <h1>What is this site?</h1>
        <p>
          As someone who loves listening to music, I constantly want to find new music
          to add to my playlists. Quite often, I find a song that I <b>really</b> like,
          and I want to find songs that are similar to it. Of course, Spotify has the 
          option of generating a song radio for that song, however the songs suggested
          often are either songs I already know, or just are not good recommendations.
          Out of the 50 songs in that radio, maybe at max 10 of them are decent suggestions.
        </p>
          <p>
          I wanted to be able to find new music; new music that I know I will enjoy based on
          my recent listening. I was able to use the Spotify API to allow the user to search
          a song they really like, and generate songs that actually match the song they inputted,
          rather than suggestions that sometimes feel "random".
          </p>
          <h1>How does it work?</h1>
          <p>
            The API provides track attributes for each of Spotify's tracks. This can range from
            acousticness, energy, tempo, and more. I took what I thought were the most significant
            attributes for a track, and had the API provide recommendations based around those attributes.
            So, when you input a song, the API will take that song's specific attributes and use them as
            search parameters for when it generates its recommendations.
          </p>
          <p>
            For example, if you enjoy the song "love." by Wave to Earth, it'll do its best to provide you 4-5 tracks
            that are just like it. You can search the same song multiple times and it'll generate a new list of tracks
            so that you can milk out as many similar tracks as possible until you've seen all the possible results
            of one song.
          </p>
          <h1>A Technical Problem!</h1>
          <p>
            One problem of the algorithm to search for songs was that when searching for a track, the numerical values
            for each attribute were always the same when searching, therefore reusing the same track in the search
            would not provide any variety to the results.
          </p>
          <p>
            To fix this, I instead took the numerical values of the attributes, and randomized them within a range of 
            +5 and -5. For example, if acousticness = 50, a random value between 45-55 will be used at the set value
            for the acousticness value in the recommendations. This allows for a larger variety. One attribute, tempo,
            has a much larger range because the tempo of many songs vary too much, that if kept within the +/-5 range,
            it actually would significantly reduce the amount of unique results.
          </p>
          <h1>Final Thoughts!</h1>
          <p>
            Overall, this was the most enjoyable project I've worked on. I was able to practice my frontend skills, 
            from starting with a Figma UI design, and then being able to implement my design in React. Furthermore,
            this was my first experience working with backend! To make all the features I wanted functional, I 
            had to learn how to use a Node.js and Express based server on the backend, as well as creating a proper
            OAuth flow in order to gain access to a user's personal information from their Spotify account. 
          </p>
          <p>
            Most importantly, I got to create something that I and other people can actually use. Music is a
            such an essential part of my life that I'm glad that I have something that allows me to extend upon
            it whenever I please. Anyways, thank you for reading and to whomever is using this, please enjoy! ヽ(•‿•)ノ
          </p>
          
      </div>

      <div>

      </div>
    </div>
  )
}

export default Homepage;