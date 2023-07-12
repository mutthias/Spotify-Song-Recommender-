import './Navbar.css'
import React from 'react';

function Navbar() {
  return (
    <nav className='Nav'>
      <div className='Logo'>
        Statify
      </div>

        <ul className='directory'>
        <li>
          <a href='/Home'>Home</a>
        </li>
        <li>
          <a href='/About'>About</a>
        </li>
        <li>
          <a href='/Top-Tracks'>Top Tracks</a>
          </li>
        <li>
          <a href='/Top-Artists'>Top Artists</a>
        </li>
      </ul>

      <div className='Profile'>
        Login
      </div>
    </nav>
  )
}

export default Navbar;