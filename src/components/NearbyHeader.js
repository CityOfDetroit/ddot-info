import React from 'react';
import { Link } from 'react-router-dom';

import ChevronSVG from '../img/chevron.svg';
import Info from '../img/info_outline.svg';

const NearbyHeader = () => (
  <div className="nav header" style={{ padding: '1em', background: '#004445',display: 'flex', alignItems: 'center', verticalAlign: 'middle', justifyContent: 'space-between' }}>
    <div style={{display: 'flex', alignItems: 'center', fontSize: window.innerWidth < 650 ? '1em' : '1.5em'}}>
      <Link className="link dim pr3" to={{ pathname: `/` }}>
        <img src={ChevronSVG} className="" alt="Back to home" />
      </Link>
      <span className="pa2 fw5 white">
        Nearby
      </span>
    </div>
    <div>
      <Link className="link dim pr3" to={{ pathname: `/about` }}>
        <img src={Info} alt="Info" />
      </Link>
    </div>
  </div>
);

export default NearbyHeader;