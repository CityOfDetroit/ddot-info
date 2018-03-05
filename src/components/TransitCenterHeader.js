import React from 'react';
import { Link } from 'react-router-dom';

import ChevronSVG from '../img/chevron.svg';
import Info from '../img/info_outline.svg';

const TransitCenterHeader = () => (
  <div className="nav header" style={{ background: '#004445' }}>
    <div className="pa3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <Link className="link dim pr3" to={{ pathname: `/` }}>
          <img src={ChevronSVG} alt="Back to home" />
        </Link>
        <span className="f3 mh2 pa2 fw5 white">
          Rosa Parks Transit Center
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

export default TransitCenterHeader;
