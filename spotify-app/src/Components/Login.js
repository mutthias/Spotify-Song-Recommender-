import React from "react";
import '../Components/Login.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

const code = new URLSearchParams(window.location.search).get('code')

const Login = ({code, pfp}) => {
  return 
  code ? 
    <button className='ProfileButton' onClick={logout}>
      <img className='pfp' src={pfp} alt='' />
    </button>
   : 
    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}`}>Login</a>
  
}

export default Login;