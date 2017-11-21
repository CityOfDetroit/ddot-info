import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => (
  <nav className="pa3 pa4-ns">
    <a className="link dim black b f6 f5-ns dib mr3"><Link to="/">Home</Link></a>
    <a className="link dim gray f6 f5-ns dib mr3"><Link to="/about">About</Link></a>
  </nav>
)

export default TopNav;
