import React from 'react';
import { Link } from 'react-router-dom';
import ddotRoutes from '../data/routes.js'

const LineHeader = ({ color, number, name }) => (
  <div className="pv3 ph3 bg-white bg-o-50 bb">
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Link className="link dim dark-gray v-mid mr2" to={{pathname: `/`}}><div className="fw7 f7 f6-ns pa2 bg-moon-gray ba">&lt;</div></Link>
      <span className="dib f3-s f2-ns mh2 pa2 v-mid white fw7" style={{ backgroundColor: color }}>
        {number}
      </span>
      <div className="dib">
        <span className="db f4-s f3-ns v-mid fw5 mr2">
          {name}
        </span>
        <span className="dn db-ns f7">
          {ddotRoutes[number].description}
        </span>
      </div>
    <Link className="link dim dark-gray ma2" to={{pathname: `/route/${number}/real-time`}}><div className="fw7 f7 f6-ns pa2 bg-moon-gray ba ">Live</div></Link>
    <Link className="link dim dark-gray ma2" to={{pathname: `/route/${number}/schedule`}}><div className="fw7 f7 f6-ns pa2 bg-moon-gray ba">Schedule</div></Link>
    </div>
  </div>
);

export default LineHeader;
