import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TopArtistCard from '../Components/TopArtistCard';
import './TopTracks.css';
import Navbar from '../Components/Navbar';


const TopArtists = ( { token, login } ) => {

  const [alltime, setAlltime] = useState([]);
  const [sixmonths, setSixmonths] = useState([]);
  const [fourweeks, setFourweeks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setLoaded(false);
    if (!token) {
      return; // Return early if token is not available yet
    }

    async function fetchData() {
      try {
        const { data: alltimeData } = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
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
          "https://api.spotify.com/v1/me/top/artists",
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
          "https://api.spotify.com/v1/me/top/artists",
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

  return (
    
    <div className='tt_container'>
      <div className='testing'>
      <Navbar token={token} login={login} style={{ position: 'absolute' }} />
      </div>

      <div className='slider'>
        <h1 className='tt_h1'>
          Last 4 weeks
        </h1>
        <Slider dots={true} infinite={true} speed={500}  slidesToShow={5}>
          {loaded && fourweeks.map((artist, index) => (
            <TopArtistCard index={index} artist={artist}/>
          ))}
        </Slider>
      </div>
      <div className='slider'>
        <h1 className='tt_h1'>
          Last 6 Months
        </h1>
        <Slider dots={true} infinite={true} speed={500}  slidesToShow={5}>
          {loaded && sixmonths.map((artist, index) => (
          <TopArtistCard index={index} artist={artist}/>

          ))}
        </Slider>
      </div>
      <div className='slider'>
        <h1 className='tt_h1'>
          All Time
        </h1>
        <Slider dots={true} infinite={true} speed={500}  slidesToShow={5}>
          {loaded && alltime.map((artist, index) => (
            <TopArtistCard index={index} artist={artist}/>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default TopArtists