import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './TopTracks.css'


const TopTracks = ( { token } ) => {
  const [toptracks, setTopTracks] = useState([])
  
const GetTopTracks = async () => {
  console.log(token)
  try {
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 20,
        time_range: 'short_term',
      },
    });
    const tracksData = data.items
    setTopTracks(tracksData); 
    console.log(tracksData);
    return tracksData; 
  } catch (error) {
    console.error('Error fetching top tracks:', error.response?.data || error);
    throw error; 
  }
}

  return (
    <div className='test'>
      <button  onClick={() => GetTopTracks()}>Click Me!</button>
    </div>
  )
}

export default TopTracks