import axios from 'axios';
import './Navbar.css'
import React from 'react';
import { useEffect, useState } from 'react';
import Login from './Login';

const Navbar = ({ token, logout }) => {
  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  var state = generateRandomString(16);
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
  const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
  const SCOPE = process.env.REACT_APP_SCOPE;

  const [pfp, setPFP] = useState("");
  
  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (token) {

        const { data } = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data)
        const pictureUrl = data.images[0].url;
        setPFP(pictureUrl);

      }
    };

    fetchProfilePicture();
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

      <div className='Profile'>
        <Login code={token} pfp={pfp}/>

      </div>
    </nav>
  )
}

export default Navbar;