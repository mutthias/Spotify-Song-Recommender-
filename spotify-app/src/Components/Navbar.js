import './Navbar.css'
import React from 'react';
import { useEffect, useState } from 'react';

const Navbar = ({ token, logout, login }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [spotifyURI, setSpotifyURI] = useState('');
  const [href, setHref] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [country, setCountry] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [error, setError] = useState('');
  const [pfp, setPfp] = useState([]);
  const [uri, setUri] = useState('')


  const [serverResponse, setServerResponse] = useState('');
  
  

  useEffect(() => {

    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    const params = getHashParams();
    const access_token = params.access_token || '';
    const refresh_token = params.refresh_token || '';
    const error = params.error || '';
    

    if (error) {
      setError('There was an error during the authentication');
    } else {
      if (token) {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        window.localStorage.setItem("REALtoken", access_token)

        // Fetch user profile data from Spotify API
        fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => response.json())
        .then(data => {
          setLoggedIn(true);
          setDisplayName(data.display_name || '');
          setUserId(data.id || '');
          setEmail(data.email || '');
          setSpotifyURI(data.external_urls.spotify || '');
          setHref(data.href || '');
          setProfileImage(data.images[0]?.url || '');
          setCountry(data.country || '');
          setPfp(data.images || []);
          setUri(data.uri || '')

        // Console log the email for testing purposes
        console.log(data);
      })
      .catch(err => {
        setError('Failed to fetch user profile from Spotify API');
        console.error(err);
      });
      }
      const hash = window.location.hash 
      if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
        window.location.hash = ""
        window.localStorage.setItem("token", token)
      }
    }
  }, [token]);


  return (
    <nav className='Nav'>
      <div className='Logo'>
        Statify
      </div>

        <ul className='directory'>
        <li>
          <a href='/Home'>Home</a>
        </li>
        <li>
          <a href='/About'>About</a>
        </li>
        <li>
          <a href='/Top-Tracks'>Top Tracks</a>
          </li>
        <li>
          <a href='/Top-Artists'>Top Artists</a>
        </li>
      </ul>
      {console.log(pfp)}
      {token ? (
        <div className='Profile'>
          <a href={uri}>
            {pfp.length > 0 && pfp[0].url ? (
              <img className='pfp' src={pfp[0].url} alt="User Profile" />
            ) : (
              <div>Loading...</div> // You can display a loading message or spinner here
            )}
          </a>
        </div>
      ) : (
        <div className='Profile'>
          <a href="http://localhost:8888/login" className="btn btn-primary">Log in with Spotify</a>
          
        </div>
      )}
      
    </nav>
  )
}

export default Navbar;