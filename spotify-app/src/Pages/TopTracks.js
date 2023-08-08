import React from 'react'
import axios, { all } from 'axios'
import { useState, useEffect } from 'react'
import TopTrackCard from '../Components/TopTrackCard'
import './TopTracks.css'
import Navbar from '../Components/Navbar'


const TopTracks = ( { token } ) => {

  const [alltime, setAlltime] = useState([]);
  const [sixmonths, setSixmonths] = useState([]);
  const [fourweeks, setFourweeks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (!token) {
      return; // Return early if token is not available yet
    }

    async function fetchData() {
      try {
        const { data: alltimeData } = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 20,
              time_range: 'long_term',
            },
          }
        );

        const { data: sixMonthsData } = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 20,
              time_range: 'medium_term',
            },
          }
        );

        const { data: fourWeeksData } = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 20,
              time_range: 'short_term',
            },
          }
        );

        setAlltime(alltimeData.items);
        setSixmonths(sixMonthsData.items);
        setFourweeks(fourWeeksData.items);
      } catch (error) {
        console.error('Error fetching top tracks:', error.response?.data || error);
      }
    }

    fetchData();
    setLoaded(true);
  }, [token]);

  console.log(fourweeks)
  console.log(sixmonths)
  console.log(alltime)

  return (
    
    <div className='tt_container'>
      <div className='testing'>
      <Navbar token={token} style={{ position: 'absolute' }} />
      </div>
      {/* <button  onClick={() => GetTwoWeeks()}>Click Me!</button>
      <button  onClick={() => GetFourMonths()}>Click Me!</button>
      <button  onClick={() => GetAllTime()}>Click Me!</button> */}
      
      <h1 className='tt_h1'>
        Last 4 weeks
      </h1>
      {loaded && fourweeks.map((song, index) => (
        <TopTrackCard key={index} song={song}/>
      ))}
      <hr></hr>
      <h1 className='tt_h1'>
        Last 6 Months
      </h1>
      {loaded && sixmonths.map((song, index) => (
        <TopTrackCard key={index} song={song}/>
      ))}
      <hr></hr>
      <h1 className='tt_h1'>
        All Time
      </h1>
      {loaded && alltime.map((song, index) => (
        <TopTrackCard key={index} song={song}/>
      ))}
      
      
    </div>
  )
}

export default TopTracks