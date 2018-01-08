import React from 'react';
import { Link } from 'react-router-dom';

const LineHeader = ({ color, number, name }) => (
  <div className="pv3 ph3 flex justify-between bg-light-gray bb">
    <div>
      <Link className="link dim dark-gray v-mid" to={{pathname: `/`}}><div className="fw7 f7 f6-ns v-mid pa2 mh1 dib bg-moon-gray ba">&lt;</div></Link>
      <span className="dib f3-s f2-ns mh2 pv1 ph2 v-mid white fw7" style={{ backgroundColor: color }}>
        {number}
      </span>
      <span className="dib f4-s f3-ns v-mid fw5 mr2">
        {name}
      </span>
    </div>
    <div className="v-mid">
      <Link className="link dim dark-gray v-mid" to={{pathname: `/route/${number}/real-time`}}><div className="fw7 f7 f6-ns v-mid pa2 mh1 dib bg-moon-gray ba ">Live</div></Link>
      <Link className="link dim dark-gray v-mid" to={{pathname: `/route/${number}/schedule`}}><div className="fw7 f7 f6-ns v-mid pa2 mh1 dib bg-moon-gray ba">Schedule</div></Link>
    </div>
  </div>
);

export default LineHeader;
