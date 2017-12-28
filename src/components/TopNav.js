import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => (
  <nav className="pv3 ph3 bg-moon-gray">
    <span className="dib f5 f3-ns dib ml3 mr5 fw5 v-mid" >Route Explorer</span>
    <Link to="/" className="link dim black b f6 f4-ns dib mr3 v-mid">Home</Link>
    <Link to="/about" className="link dim gray f6 f4-ns dib mr3 v-mid">About</Link>
  </nav>
)

export default TopNav;
