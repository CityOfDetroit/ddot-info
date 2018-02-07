import React from 'react';
import { Link } from 'react-router-dom';
import Bus from '../img/bus.png';

const StopHeader = ({ id, name }) => (
  <div className="pv3 ph3 bg-white bg-o-50 header bb" style={{ display: 'flex', alignItems: 'center', }}>
      <Link className="link dim dark-gray" to={{ pathname: `/` }}>
        <img src={Bus} className="w3 ph2" />
      </Link>     
      <span className="f4-s f3-ns mh2 pa2 fw5">
        {name}
      </span>
      <span className="f4-s pa2 f3-ns fw7 mr2 bg-moon-gray">
        #{id}
      </span>
    </div>
);

export default StopHeader;
