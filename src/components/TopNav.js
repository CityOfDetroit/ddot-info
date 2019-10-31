import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../data/logoc.png'

import NavLinks from './NavLinks';

/** Top navigation across app */
const TopNav = () => (
  <div className="nav header" style={{ background: '#004445' }}>
    <div style={{ display: 'flex', alignItems: 'center', verticalAlign: 'center', justifyContent: 'space-between', padding: '.75rem' }}>
      <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', fontSize: window.innerWidth < 650 ? '1.5em' : '2em' }}>
        <a href="https://www.detroitmi.gov"><img src={Logo} style={{height: 40, paddingRight: 5}} alt="City of Detroit logo"/></a>
        {/* Add a phonetic label for screen readers */}
        <Link aria-label="d dot" style={{ color: '#fff', textDecoration: 'none' }} to={{ pathname: '/' }}>DDOT</Link>
      </div>
      <NavLinks />
    </div>
  </div>
);

export default TopNav;
