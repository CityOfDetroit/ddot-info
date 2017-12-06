import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => (
  <nav className="pa3 pa4-ns">
    <Link to="/" className="link dim black b f6 f5-ns dib mr3">Home</Link>
    <Link to="/about" className="link dim gray f6 f5-ns dib mr3">About</Link>
  </nav>
)

export default TopNav;
