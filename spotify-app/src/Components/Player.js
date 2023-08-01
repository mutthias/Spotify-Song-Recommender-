import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import './Player.css'

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    
    <div className="spotify-player-container">

    <SpotifyPlayer
    styles={{
      activeColor: 'white',
      bgColor: 'rgba(0,0,0,0.7)',
      color: '#fff',
      loaderColor: '#fff',
      sliderColor: '#1cb954',
      trackArtistColor: '#ccc',
      trackNameColor: '#fff',
    }}
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      initialVolume={0.1}
    
    />
    </div>
  )
}