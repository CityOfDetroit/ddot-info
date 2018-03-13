import React from 'react';
import { Link } from 'react-router-dom';

import Info from '../img/info_outline.svg';

const TopNav = () => (
  <div className="nav header" style={{background: '#004445'}}>
    <div className="pa3" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
      <div className="ph3" style={{fontSize: window.innerWidth < 650 ? '1.25em' : '2em'}}>
        <Link className="link dim white" to={{ pathname: '/' }}>DDOT // Buses</Link>
      </div>
      <Link className="link dim pr3" to={{ pathname: `/about` }}>
        <img src={Info} alt="Info" />
      </Link>
    </div>
  </div>
)

export default TopNav;
