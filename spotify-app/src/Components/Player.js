import React, { useEffect, useRef } from 'react';

const Player = ({ accessToken }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Create a new Spotify Web Playback SDK instance
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'My Spotify Player',
        getOAuthToken: cb => {
          cb(accessToken);
        },
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize player:', message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate player:', message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account:', message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error('Failed to perform playback:', message);
      });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        console.log('Current playback state:', state);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Player ready with Device ID', device_id);

        // Start playback with a Spotify track URI
        player._options.getOAuthToken(token => {
          fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              uris: ['spotify:track:3n3Ppam7vgaVa1iaRUc9Lp'], // Replace this with your track URI
            }),
          });
        });
      });

      // Connect the player
      player.connect().then(success => {
        if (success) {
          console.log('Connected to Spotify player');
        }
      });

      playerRef.current = player;
    };

    return () => {
      // Clean up when the component is unmounted
      playerRef.current && playerRef.current.disconnect();
    };
  }, [accessToken]);

  return (
    <div>
      {/* Render your Spotify player UI here */}
    </div>
  );
};

export default Player;