import React from 'react';
import { Link } from 'react-router-dom';

import ChevronSVG from '../img/chevron.svg';
import Info from '../img/info_outline.svg';

const StopHeader = ({ id, name }) => (
  <div className="nav header" style={{ padding: '1em', background: '#004445',display: 'flex', alignItems: 'center', verticalAlign: 'middle', justifyContent: 'space-between' }}>
    <div style={{display: 'flex', alignItems: 'center', fontSize: window.innerWidth < 650 ? '1em' : '1.5em'}}>
      <Link className="link dim pr3" to={{ pathname: `/` }}>
        <img src={ChevronSVG} className="" alt="Back to home" />
      </Link>
      <span className="pa2 fw5 white">
        {name}
      </span>
      <span className="fw7 f5 mr2 pa2" style={{background: '#ddd'}}>
        Stop ID #{id}
      </span>
    </div>
    <div>
      <Link className="link dim pr3" to={{ pathname: `/about` }}>
        <img src={Info} alt="Info" />
      </Link>
    </div>
  </div>
);

export default StopHeader;
