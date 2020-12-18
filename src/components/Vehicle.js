import React from 'react';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Vehicle = ({ vehicle, patterns, tracked, setTracked }) => {

  let pattern = patterns.filter(p => p.pid === vehicle.properties.pid)[0];
  let nextStop = null;
  if (pattern) {
    for (let pt of pattern.pt) {
    if (pt.pdist > vehicle.properties.pdist && pt.stpnm) {
      nextStop = pt.stpnm;
      break;
    }
  }
  }
  let lookup = {
    "SOUTH": "Southbound",
    "NORTH": "Northbound",
    "EAST": "Eastbound",
    "WEST": "Westbound"
  };

  let isLive = tracked === vehicle.properties.vid;

  return (
    <div className="flex items-center" key={vehicle.properties.vid} onClick={() => { isLive ? setTracked(null) : setTracked(vehicle.properties.vid); }}>
      <FontAwesomeIcon icon={faBus} className={isLive ? "text-xl mx-2" : "text-xl mx-2 text-gray-500 "} />
      <div className={isLive ? "bg-yellow-200 my-1 p-2 w-full mr-2" : "bg-gray-200 my-1 p-2 w-full mr-2"}>
        <div className="flex items-center justify-between">
          <span>{lookup[pattern.rtdir]}</span>
          <span className="text-sm">{nextStop ? `next stop:` : `-`}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">bus #{vehicle.properties.vid}</span>
          <span className="text-sm">{nextStop ? `${nextStop}` : `end of route`}</span>
        </div>
      </div>
    </div>
  );
};
