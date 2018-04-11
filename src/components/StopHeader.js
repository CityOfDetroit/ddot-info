import React from 'react';
import { Link } from 'react-router-dom';

import Info from 'material-ui-icons/Info'
import Home from 'material-ui-icons/Home'

const StopHeader = ({ id, name }) => (
  <div className="nav header" style={{ padding: '1em', background: '#004445',display: 'flex', alignItems: 'center', verticalAlign: 'middle', justifyContent: 'space-between' }}>
    <div style={{display: 'flex', alignItems: 'center', fontSize: window.innerWidth < 650 ? '1em' : '1.5em'}}>
      <span className="pa2 fw5 white">
        {name}
      </span>
      <span className="fw7 f5 mr2 pa2" style={{background: '#ddd'}}>
        Stop ID #{id}
      </span>
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
);

export default StopHeader;
