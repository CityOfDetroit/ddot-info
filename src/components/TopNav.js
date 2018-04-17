import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks'

const TopNav = () => (
  <div className="nav header" style={{ background: '#004445' }}>
    <div className="pa3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="ph3" style={{ fontSize: window.innerWidth < 650 ? '1.25em' : '2em' }}>
        <Link className="link dim white" to={{ pathname: '/' }}>DDOT</Link>
      </div>
      <NavLinks />
    </div>
  </div>
)

export default TopNav;
