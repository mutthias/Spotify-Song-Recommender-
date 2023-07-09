import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Navbar from './Components/Navbar';

function App() {

  // API Processing
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
  const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

  // State sets
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [tracks, setTracks] = useState([])
  // const [recs, setRecs] = useState([])
  const [trackFeatures, setTrackFeatures] = useState(null);
  const [] = useState([])

  // Only true if a token exists. Otherwise nothing will display 
  const search_display = !!token

  // Log the user in. Grab the token from the URL
  useEffect(() => {
    const hash = window.location.hash 
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  // ---------- SEARCH FUNCTIONS ----------
  const searchRecs = async (e) => {
    e.preventDefault();
    if (!trackFeatures) {
      return;
    }
    const {danceability, valence, energy} = trackFeatures;

    const {data} = await axios.get(`https://api.spotify.com/v1/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        seed_tracks: trackFeatures.id,
        target_danceability: danceability,
        target_valence: valence,
        target_energy: energy,
        limit: 20
      }
    })
    const tracksData = data.recs.items; // Access tracks from data.tracks.items
    // setRecs(tracksData); // Set the tracks state
    console.log(tracksData);
  }

  const searchTracks = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "track",
        limit: 1
      }
    })
    const tracksData = data.tracks.items; // Access tracks from data.tracks.items
    setTracks(tracksData); // Set the tracks state
    
    if (tracksData.length > 0) {
      const trackId = tracksData[0].id;
      console.log(trackId)
      console.log("hi")
      const trackFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      const trackFeatures = trackFeaturesResponse.data
      setTrackFeatures(trackFeatures);
      console.log(trackFeatures);
    }
    

    console.log("hi again")
    console.log(data);
  }
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
    return tracks.map(rec => (
      <div key={rec.id}>
        {rec.album.images.length ? <img width={'20%'}src={rec.album.images[0].url} alt=''/> : <div>No Image</div> }
        {rec.name}
      </div>
    ))
  }
  const renderTracks = () => {
    return tracks.map(track => (
      <div key={track.id}>
        {track.album.images.length ? <img width={'20%'}src={track.album.images[0].url} alt=''/> : <div>No Image</div> }
        {track.name}
      </div>
    ))
  }
  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img src={artist.images[0].url} alt=''/> : <div>No Image</div> }
        {artist.name}
      </div>
    ))
  }

  
  return (
    <Router>
      <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path='/Home' element={<Homepage />} />
        </Route>
      </Routes>

      <p>hi</p>
      
      {!token ?
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>
      : <button onClick={logout}>Logout</button> }

      {token ?
      <div>
        <form onSubmit={searchTracks}>
          <input type='text' onChange={e => setSearchKey(e.target.value)}/>
          <button type={'submit'} disabled={!searchKey.trim()}>Search</button>
          {renderTracks()}
        </form>
      </div>
      : <p>Please Login</p>
      }
      </div>
    </Router>
  );
}
export default App;
