import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import RouteTitle from './RouteTitle';

export const Prediction = ({ prediction, vehicle, currentTrip, setCurrentTrip, routeFeatures, last }) => {

  let readable = {
    'EAST': 'eastbound',
    'WEST': 'westbound',
    'NORTH': 'northbound',
    'SOUTH': 'southbound'
  }

  prediction.vehicle = vehicle

  let isLive = currentTrip ? currentTrip.vid === prediction.vid : false;
  let route = routeFeatures.filter(r => r.properties.short === prediction.rt)[0]

  let baseStyle = "w-full px-4 py-2"
  let liveStyle = baseStyle + " bg-yellow-200"
  let notLiveStyle = baseStyle + " bg-gray-200"

  useEffect(() => {
    if (isLive) {
      setCurrentTrip(prediction)
    }
  }, [vehicle])

  return (
    <div className={
      last ?
        isLive ? liveStyle + " border-b-2" : notLiveStyle + " border-b-2"
        : isLive ? liveStyle : notLiveStyle
    }
      onClick={() => isLive ? setCurrentTrip(null) : setCurrentTrip(prediction)}
    >

      <div className="flex items-center justify-between">
        <RouteTitle short={route.properties.short} color={route.properties.color} long={route.properties.long} size='small' />
        <span className={prediction.prdctdn === 'DUE' ? 'font-bold' : ''}>
          {prediction.prdctdn === 'DUE' ? `Arriving now` : `in ${prediction.prdctdn} minutes`}
        </span>
      </div>

      <div className="flex items-center justify-between flex-row-reverse">
        <span className="text-sm text-gray-500">
          #{prediction.vid} <FontAwesomeIcon icon={faBus} className="ml-1" />
        </span>
        <span className={'font-bold text-sm text-gray-700'}>{readable[prediction.rtdir]}</span>
      </div>
    </div>
  );
};

export default Prediction;