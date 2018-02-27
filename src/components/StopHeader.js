import React from 'react';
import { Link } from 'react-router-dom';

import ChevronSVG from '../img/chevron.svg';
import Info from '../img/info_outline.svg';

const StopHeader = ({ id, name }) => (
  <div className="nav header" style={{ background: '#004445' }}>
    <div className="pa3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <Link className="link dim pr3" to={{ pathname: `/` }}>
          <img src={ChevronSVG} className="" alt="Weird bus logo" />
        </Link>
        <span className="f3 pa2 fw7 mr2" style={{background: 'hsl(60, 84%, 49%)'}}>
          #{id}
        </span>
        <span className="f3 mh2 pa2 fw5 white">
          {name}
        </span>
      </div>
      <div>
        <Link className="link dim pr3" to={{ pathname: `/about` }}>
          <img src={Info} alt="Info" />
        </Link>
      </div>
    </div>
  </div>
);

export default StopHeader;
