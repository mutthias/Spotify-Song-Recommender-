import React, { useState } from 'react';
import axios from 'axios';

const Player = ({ token }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [device, setDevice] = useState('');

  const handlePlayPause = async () => {
    
    const { data } = await axios.get("https://api.spotify.com/v1/me/player/devices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const playerid = data.devices.id;
    console.log(playerid)
    setDevice(playerid)

    const response = await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device}`,
            {
                "context_uri": 'spotify:track:4i2T7Nm4Q72sNnSlGADSm6',
                "offset": {
                    "position": 5
                },
                "position_ms": 0
            },
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
    // try {
    //   const url = `https://api.spotify.com/v1/me/player/play`;
    //   const data = {
    //     context_uri: "spotify:track:4i2T7Nm4Q72sNnSlGADSm6",
    //     offset: {
    //     position: 5
    //     },
    //     position_ms: 0
    //   };
    //   const headers = {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   };

    //   if (isPlaying) {
    //     await axios.put(url, null, { headers });
    //   } else {
    //     await axios.put(url, data, { headers });
    //   }

    //   setIsPlaying((prevState) => !prevState);
    // } catch (error) {
    //   console.error('Error toggling playback:', error);
    // }
  };

  return (
    <div>
      <div onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</div>
    </div>
  );
};

export default Player;