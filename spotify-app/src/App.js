import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Homepage from './Pages/Homepage';
import TopTracks from './Pages/TopTracks';
import TopArtists from './Pages/TopArtists';
import Navbar from './Components/Navbar';
import SongCard from './Components/SongCard';
// import Play from './Components/Play';


const App = () => {

  // State sets
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [selectedTrackUri, setSelectedTrackUri] = useState(null);
  const [artists, setArtists] = useState([])
  const [tracks, setTracks] = useState([])
  const [recs, setRecs] = useState([])
  const [trackFeatures, setTrackFeatures] = useState(null);
  const [alltime, setAlltime] = useState([])
  const [fourmonths, setFourmonths] = useState([])
  const [twoweeks, setTwoweeks] = useState([])
  const [] = useState([])
  const [loggedin, setLoggedIn] = useState(false)

  // Only true if a token exists. Otherwise nothing will display 
  const search_display = !!token
  

  const updateAccessToken = (newAccessToken) => {
    setToken(newAccessToken);
  };
 
  // Log the user in. Grab the token from the URL
  useEffect(() => {
    const hash = window.location.hash 
    let token = window.localStorage.getItem("token")
    if (token) {
      console.log('token found!')
      setToken(token)
      setLoggedIn(true)
    } else {
      console.log('no token yet!')
    }

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const getRandomValue = (originalValue, tolerance) => {
    const min = originalValue - tolerance;
    const max = originalValue + tolerance;
    return Math.random() * (max - min) + min;
  };

  // ---------- SEARCH FUNCTIONS ----------
  let previousRecs = [];

  const searchTracks = async (e) => {
    e.preventDefault();
    setRecs([]);
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
        limit: 1,
      },
    });

    const tracksData = data.tracks.items; // Access tracks from data.tracks.items
    console.log(tracksData)
    setTracks(tracksData); // Set the tracks state

    if (tracksData.length > 0) {
      const trackId = tracksData[0].id;
      console.log(tracksData[0].uri);
      console.log("hi");

      const trackFeaturesResponse = await axios.get(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const trackFeatures = trackFeaturesResponse.data;
      setTrackFeatures(trackFeatures);
      console.log(trackFeatures);

      let {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        loudness,
        tempo,
        valence,
      } = trackFeatures;

      acousticness = getRandomValue(acousticness, 0.1);
      danceability = getRandomValue(danceability, 0.1);
      energy = getRandomValue(energy, 0.1);
      instrumentalness = getRandomValue(instrumentalness, 0.1);
      loudness = getRandomValue(loudness, 5);
      tempo = getRandomValue(tempo, 50);
      valence = getRandomValue(valence, 0.1);

      
      const RecResponse = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            seed_tracks: trackId,
            target_acousticness: acousticness,
            target_danceability: danceability,
            target_energy: energy,
            target_instrumentalness: instrumentalness,
            target_loudness: loudness,
            target_tempo: tempo,
            target_valence: valence,
            limit: 5,
          },
        }
      );

    const recs = RecResponse.data.tracks.filter(
      (track) => track.id !== trackId && (!previousRecs.includes(track.id))
    );

    
    previousRecs = [];

    previousRecs = recs.map((track) => track.id);
    console.log(previousRecs);
    setRecs(recs);
    console.log(recs);
  }
};
  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    setArtists(data.artists.items)
    console.log(data)
  }

  // ---------- RENDER FUNCTIONS ----------
  const renderRecs = () => {
    return (
      <div>
        <SongCard recs = {recs} token={token}/>
      </div>
    )
  }
  
  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img src={artist.images[0].url} alt=''/> : <div>No Image</div> }
        {artist.name}
      </div>
    ))
  }

  // ---------- TOP ITEM FUNCTIONS -----------


  return (
    <Router>
      <div className='App'>
      
      <Routes>
        <Route exact path="/" element={<Homepage 
          searchTracks={searchTracks} 
          setSearchKey={setSearchKey}
          searchKey={searchKey} 
          renderRecs={renderRecs}
          token={token}
          recs={recs}
          login={loggedin}
          />} />
        <Route exact path="/Home" element={<Homepage 
          searchTracks={searchTracks} 
          setSearchKey={setSearchKey}
          searchKey={searchKey} 
          renderRecs={renderRecs}
          token={token}
          recs={recs}
          login={loggedin}
          />}/>
        <Route exact path='/Top-Tracks' element={<TopTracks token={token} login={loggedin} />} />
        <Route exact path='/Top-Artists' element={<TopArtists token={token} login={loggedin} />} />
      </Routes>
      {/* <Auth updateAccessToken={updateAccessToken} /> */}
      </div>
    </Router>
  );
}
export default App;
