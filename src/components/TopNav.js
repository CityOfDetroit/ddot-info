import React from 'react';
import { Link } from 'react-router-dom';

import Info from 'material-ui-icons/Info'
import Home from 'material-ui-icons/Home'

const TopNav = () => (
  <div className="nav header" style={{background: '#004445'}}>
    <div className="pa3" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
      <div className="ph3" style={{fontSize: window.innerWidth < 650 ? '1.25em' : '2em'}}>
        <Link className="link dim white" to={{ pathname: '/' }}>DDOT</Link>
      </div>
      <div>
        <Link className="link dim pr3" to={{ pathname: `/about` }} style={{color: 'white'}}>
          <Info />
        </Link>
        <Link className="dim pr3" to={{ pathname: `/` }} style={{color: 'white'}}>
          <Home />
        </Link>
      </div>
    </div>
  </div>
)

export default TopNav;
