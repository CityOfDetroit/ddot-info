import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Schedules from '../data/schedules.js';
import ChevronSVG from '../img/chevron.svg';

const RouteHeader = ({ number }) => {
  const thisRoute = Schedules[number];
  const color = thisRoute.color;
  const name = thisRoute.rt_name;
  const page = window.location.pathname.split('/').slice(-1)[0]

  return (
    <div className="nav header" style={{background: '#004445'}}>
      <div className="pa3" style={{display: 'flex', alignItems: 'center', }}>
        <Link className="link dim pr3" to={{ pathname: `/` }}>
          <img src={ChevronSVG} className="" alt="Go back" />
        </Link>
        <div>
          <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start'}}>
          <Link className="link dim" to={{ pathname: `/route/${number}`}} > 
            <div className='white fw7 f3 tc' style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: color }}>
              {number}
            </div> 
          </Link>
            <div className='white glow ph3' style={{fontSize: `2em`}}>
              {name}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
         <Link className="link dim white pv2 ph3 ml3" style={page === 'real-time' ? {background: `white`, color: `black`} : {background: 'rgba(255,255,255,0.2)'}} to={{ pathname: `/route/${number}/real-time` }}>
           Live
         </Link>
         <Link className="link dim white pv2 ph3 ml3" style={page === 'stops' ? {background: `white`, color: `black`} : {background: 'rgba(255,255,255,0.2)'}} to={{ pathname: `/route/${number}/stops` }}>
           Stops
         </Link>
         <Link className="link dim white pv2 ph3 ml3" style={page === 'schedule' ? {background: `white`, color: `black`} : {background: 'rgba(255,255,255,0.2)'}} to={{ pathname: `/route/${number}/schedule` }}>
           Schedule
         </Link>
      </div>
    </div>
  )
}

RouteHeader.propTypes = {
  number: PropTypes.string.isRequired,
}

export default RouteHeader;
