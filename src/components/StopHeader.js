import React from 'react';
import { Link } from 'react-router-dom';

const StopHeader = ({ id, name }) => (
  <div className="pv3 ph3 flex justify-between bg-light-gray bb header">
    <div>
      <Link className="link dim dark-gray v-mid" to={{pathname: `/`}}><div className="fw7 f7 f6-ns v-mid pa2 mh1 dib bg-moon-gray ba">&lt;</div></Link>
      <span className=" f4-s f3-ns v-mid fw7 ml2">
        {name}
      </span>
      <span className=" f5-s f4-ns mh2 pv1 ph2 v-mid white fw7" style={{ backgroundColor: 'gray' }}>
        #{id}
      </span>
    </div>
  </div>
);

export default StopHeader;
