import React from 'react';
import { Link } from 'react-router-dom';
import Bus from '../img/bus.png'

const TopNav = () => (
  // <nav className="pv2 ph2 bg-moon-gray nav" style={{display: 'flex', alignItems: 'center'}}>
  //   <span className="dib f5 f3-ns dib ml5 mr5 fw5 v-mid" >Route Explorer</span>
  //   <Link to="/" className="link dim black b f6 f4-ns dib mr3 v-mid">Home</Link>
  //   <Link to="/about" className="link dim gray f6 f4-ns dib mr3 v-mid">About</Link>
  // </nav>

  <div className="pv3 ph3 bg-white bg-o-50 header bb" style={{ display: 'flex', alignItems: 'center', verticalAlign: 'center' }}>
    <Link className="link dim dark-gray" to={{ pathname: `/` }}>
      <img src={Bus} className="w3 ph2" />
    </Link>     
    <span className="f4-s f3-ns mh2 pa2 fw7">
      Route Explorer
    </span>
    <Link to="/" className="link dim gray fw7 f6 f5-ns ma2 pa2" style={{border: '3px solid #ddd'}}>Home</Link>
    <Link to="/about" className="link dim gray fw7 f6 f5-ns ma2 pa2" style={{border: '3px solid #ddd'}}>About</Link>
  </div>
)

export default TopNav;
