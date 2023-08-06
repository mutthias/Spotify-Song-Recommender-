import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import TopTrackCard from '../Components/TopTrackCard'
import './TopTracks.css'
import Navbar from '../Components/Navbar'


const TopTracks = ( { token } ) => {
  const [toptracks, setTopTracks] = useState([])
  
const GetTopTracks = async () => {
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
    
    <div className='tt_container'>
      <div className='testing'>
      <Navbar token={token} style={{ position: 'absolute' }} />
      </div>
      {/* <button  onClick={() => GetTopTracks()}>Click Me!</button> */}
      <h1 className='tt_h1'>
        Last 4 weeks
      </h1>
      <hr></hr>
      <h1 className='tt_h1'>
        Last 6 Months
      </h1>
      <hr></hr>
      <h1 className='tt_h1'>
        All Time
      </h1>
      
      <TopTrackCard />
    </div>
  )
}

export default TopTracks