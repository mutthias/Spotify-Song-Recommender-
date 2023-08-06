import axios from 'axios';
import './Navbar.css'
import React from 'react';
import { useEffect, useState } from 'react';
import Login from './Login';

const Navbar = ({ token, logout }) => {
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

  const [serverResponse, setServerResponse] = useState('');
  
  // useEffect(() => {
  //   const fetchProfilePicture = async () => {
  //     if (token) {

  //       const { data } = await axios.get('https://api.spotify.com/v1/me', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(data)
  //       const pictureUrl = data.images[0].url;
  //       setPFP(pictureUrl);

  //     }
  //   };

  //   fetchProfilePicture();
  // }, [token]);


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
      if (access_token) {
        
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        window.localStorage.setItem("REALtoken", access_token)

        // Fetch user profile data from Spotify API
        fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': 'Bearer ' + access_token
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

        // Console log the email for testing purposes
        console.log('User email:', data.email);
      })
      .catch(err => {
        setError('Failed to fetch user profile from Spotify API');
        console.error(err);
      });
      }

    }
  }, []);

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

      <div className='Profile'>
      <a href="http://localhost:8888/login" className="btn btn-primary">Log in with Spotify</a>

      </div>
      
    </nav>
  )
}

export default Navbar;