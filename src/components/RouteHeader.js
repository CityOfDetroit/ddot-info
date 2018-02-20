import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Bus from '../img/bus.png'

import Schedules from '../data/schedules.js';

const RouteHeader = ({ number }) => {
  const thisRoute = Schedules[number];
  const color = thisRoute.color;
  const name = thisRoute.rt_name;

  return (
    <div className="pv3 ph3 bg-white bg-o-50 header bb">
      <div className="" style={{ display: 'flex', alignItems: 'center', }}>
        <Link className="link dim dark-gray" to={{ pathname: `/` }}>
          <img src={Bus} className="w3 ph2" alt="Weird bus logo" />
        </Link>
        <Link className="link dim dark-gray" to={{ pathname: `/route/${number}`}} >   
        <span className="dib f3-s f2-ns mh2 pa2 white fw7" style={{ backgroundColor: color }}>
          {number}
        </span>
        <div className="dib">
          <span className="db f4-s f3-ns fw5 mr2">
            {name}
          </span>
        </div>
        </Link>
        <Link className="link dim dark-gray ma2" style={{border: '3px solid #ddd'}} to={{ pathname: `/route/${number}/real-time` }}>
          <div className="fw7 f7 f6-ns pa2 ">Live</div>
        </Link>
        <Link className="link dim dark-gray ma2" style={{border: '3px solid #ddd'}} to={{ pathname: `/route/${number}/schedule` }}>
          <div className="fw7 f7 f6-ns pa2" >Schedule</div>
        </Link>
        <Link className="link dim dark-gray ma2" style={{border: '3px solid #ddd'}} to={{ pathname: `/route/${number}/stops` }}>
          <div className="fw7 f7 f6-ns pa2">Stops</div>
        </Link>
      </div>
    </div>
  )
}

RouteHeader.propTypes = {
  number: PropTypes.string.isRequired,
}

export default RouteHeader;
