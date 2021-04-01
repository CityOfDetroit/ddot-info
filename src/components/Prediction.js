import React from 'react';
import RouteNumber from './RouteNumber';

export const Prediction = ({ prediction, currentTrip, setCurrentTrip, routeFeatures, last }) => {

  let readable = {
    'EAST': 'Eastbound',
    'WEST': 'Westbound',
    'NORTH': 'Northbound',
    'SOUTH': 'Southbound'
  }

  let isLive = currentTrip === prediction.vid;

  let route = routeFeatures.filter(r => r.properties.short === prediction.rt)[0]

  return (
    <div className={last ? "flex items-center" : "flex items-center border-b-2"}>
      <div className={isLive ? "bg-yellow-200 p-2 w-full" : "bg-gray-200 p-2 w-full"}>
        <div className="flex items-center">
          <RouteNumber number={route.properties.short} color={route.properties.color} size='small' />
          <span>{prediction.des} {readable[prediction.rtdir]}</span>
        </div>
        <div className="flex items-center justify-between flex-row-reverse">
        <span>in {prediction.prdctdn} minutes</span>
        <span className="text-sm text-gray-700">
          #{prediction.vid}
        </span>
        </div>
      </div>
    </div>
  );
};

export default Prediction;