import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';


const UseAuth = () => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.post('https://localhost:8888/login', {
      
    }).then(res => {
      console.log("hello!!")
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      window.history.pushState({}, null, "/")
    }).catch(err => {
      console.log(err)
      window.location = '#'
      
    })
  }, [])

  return (
    <div>
      <p>hey</p>
    </div>
  )
}

export default UseAuth;
