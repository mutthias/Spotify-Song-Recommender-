import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.post('https://localhost:3000/login', {
      code,
    }).then(res => {
      console.log("hello!!")
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      window.history.pushState({}, null, "/")
    }).catch(err => {
      window.location = '#'
      console.log(err)
    })
  }, [code])

  return (
    accessToken
  )
}
