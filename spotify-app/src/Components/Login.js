import React from "react";
import useAuth from "./useAuth"
import '../Components/Login.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
console.log(REDIRECT_URI)

const Login = ({ pfp }) => {
  
  let code = new URLSearchParams(window.location.search).get('code')
  const logout = () => {
    code = ""
    window.localStorage.removeItem("token")
  }

  const accessToken = useAuth(code)

  return (
  code ? 
  
    <button className='ProfileButton' onClick={logout}>
      <img className='pfp' src={pfp} alt='hello' />

    </button>
   : 
    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}`}>Login</a>
  )
}

export default Login;