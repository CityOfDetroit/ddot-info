import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {Tabs, Tab} from 'material-ui/Tabs';

import Schedules from '../data/schedules.js';
import ChevronSVG from '../img/chevron.svg';
import Info from '../img/info_outline.svg';

const RouteHeader = ({ number }) => {
  const thisRoute = Schedules[number];
  const color = thisRoute.color;
  const name = thisRoute.rt_name;

  return (
    <div className="nav header" style={{ background: '#004445' }}>
      <div className="pa3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: window.innerWidth < 650 ? '1em' : '1.5em' }}>
        <div>
          <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start' }}>
            <Link className="link dim pr3" to={{ pathname: `/` }}>
              <img src={ChevronSVG} className="" alt="Back to home" />
            </Link>
            <div className='white fw7 tc' style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: color }}>
              {number}
            </div> 
            <div className='white glow ph2'>
              {name}
            </div>
          </div>
        </div>
        <div>
          <Link className="link dim pr3" to={{ pathname: `/about` }}>
            <img src={Info} alt="Info" />
          </Link>
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: window.innerWidth < 650 ? '1em' : '1.2em' }}>
        <Tabs>
          <Tab 
            label={<Link to={{ pathname: `/route/${number}` }}>Route</Link>}>
          </Tab>
          <Tab 
            label={<Link to={{ pathname: `/route/${number}/stops` }}>Stops</Link>}>
          </Tab>
          <Tab 
            label={<Link to={{ pathname: `/route/${number}/schedule` }}> Schedule</Link>}>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

RouteHeader.propTypes = {
  number: PropTypes.string.isRequired,
}

export default RouteHeader;
