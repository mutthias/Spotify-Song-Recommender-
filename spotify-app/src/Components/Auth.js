import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Auth = () => {
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
    <div className="container">
      <div id="login" style={{ display: loggedIn ? 'none' : 'block' }}>
        <h1>This is an example of the Authorization Code flow</h1>
        <a href="http://localhost:8888/login" className="btn btn-primary">Log in with Spotify</a>
        <a href='http://localhost:8888/api/test'>test that the server works!</a>
      </div>
      <div id="loggedin" style={{ display: loggedIn ? 'block' : 'none' }}>
        
        <div id="oauth">
          {loggedIn && (
            <div>
              <h2>oAuth info</h2>
              <dl className="dl-horizontal">
                <dt>Access token</dt><dd className="text-overflow">{accessToken}</dd>
                <dt>Refresh token</dt><dd className="text-overflow">{refreshToken}</dd>
              </dl>
            </div>
          )}
        </div>
        <button className="btn btn-default" id="obtain-new-token" style={{ display: loggedIn ? 'block' : 'none' }}>
          Obtain new token using the refresh token
        </button>
      </div>
    </div>
  );
};

export default Auth;