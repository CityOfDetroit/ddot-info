import React from 'react';
import { Link } from 'react-router-dom';
import Bus from '../img/bus.png'

const TopNav = () => (
  <div className="pv3 ph3 bg-white bg-o-50 header bb" style={{ display: 'flex', alignItems: 'center', verticalAlign: 'center' }}>
    <Link className="link dim dark-gray" to={{ pathname: `/` }}>
      <img src={Bus} className="w3 ph2" alt="Weird bus logo" />
    </Link>     
    <span className="f4-s f3-ns mh2 pa2 fw7">
      Route Explorer
    </span>
    <Link to="/" className="link dim gray fw7 f6 f5-ns ma2 pa2" style={{border: '3px solid #ddd'}}>Home</Link>
    <Link to="/about" className="link dim gray fw7 f6 f5-ns ma2 pa2" style={{border: '3px solid #ddd'}}>About</Link>
    <Link to="/nearby" className="link dim gray fw7 f6 f5-ns ma2 pa2" style={{border: '3px solid #ddd'}}>Search Nearby</Link>
  </div>
)

export default TopNav;
