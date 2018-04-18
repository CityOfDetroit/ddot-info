import React from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks';

/** Top navigation across app */
const TopNav = () => (
  <div className="nav header" style={{ background: '#004445' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.75rem' }}>
      <div style={{ paddingRight: '.875rem', paddingLeft: '.875rem', fontSize: window.innerWidth < 650 ? '1.25em' : '2em' }}>
        <Link style={{ color: '#fff', textDecoration: 'none' }} to={{ pathname: '/' }}>DDOT</Link>
      </div>
      <NavLinks />
    </div>
  </div>
);

export default TopNav;
