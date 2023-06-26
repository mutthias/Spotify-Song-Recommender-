import axios from 'axios';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
  const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [tracks, setTracks] = useState([])

  const search_display = !!token

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

  const searchTracks = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "track",
        limit: 20
      }
    })
    const tracksData = data.tracks.items; // Access tracks from data.tracks.items
    setTracks(tracksData); // Set the tracks state
    console.log(tracksData);
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
    <div className="App">
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
  );
}
export default App;
