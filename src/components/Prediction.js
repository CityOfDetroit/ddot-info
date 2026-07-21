import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import RouteTitle from './RouteTitle';
import { keyboardActivate } from './keyboardActivate';

export const Prediction = ({ prediction, trip, vehicle, currentTrip, setCurrentTrip, routeFeatures, last }) => {

  // A trip update can arrive without a vehicle (GTFS-rt allows it), and a bus can be
  // predicted here but not yet visible in the vehicle feed. Either way the arrival
  // time is real — there's just nothing to follow on the map.
  let trackable = Boolean(prediction.vid && vehicle);

  let isLive = trackable && currentTrip ? currentTrip.vid === prediction.vid : false;
  let route = routeFeatures.filter(r => r.properties?.short === prediction.routeId)[0]

  let baseStyle = "w-full px-4 py-2"
  let liveStyle = baseStyle + " bg-yellow-200"
  let notLiveStyle = baseStyle + " bg-gray-200"

  useEffect(() => {
    if (isLive) {
      setCurrentTrip({ ...prediction, vehicle })
    }
  }, [vehicle, isLive, prediction, setCurrentTrip])

  if (!route) {
    return null
  }

  let track = () => {
    if (!trackable) return
    isLive ? setCurrentTrip(null) : setCurrentTrip({ ...prediction, vehicle })
  }

  return (
    <div className={
      last ?
        isLive ? liveStyle + " border-b-2" : notLiveStyle + " border-b-2"
        : isLive ? liveStyle : notLiveStyle
    }
      onClick={track}
      onKeyDown={keyboardActivate(track)}
      role="button"
      tabIndex={trackable ? 0 : -1}
      aria-pressed={isLive}
      aria-disabled={!trackable}
    >

      <div className="flex items-center justify-between">
        <RouteTitle short={route.properties?.short} color={route.properties.color} long={route.properties.long} size='small' />
        <span className={prediction.minutes === 0 ? 'font-bold' : ''}>
          {prediction.minutes === 0 ? `Arriving now` : `in ${prediction.minutes} minutes`}
        </span>
      </div>

      <div className="flex items-center justify-between flex-row-reverse">
        <span className="text-sm text-gray-500">
          {trackable ? <>#{prediction.vid} <FontAwesomeIcon icon={faBus} className="ml-1" /></> : `scheduled`}
        </span>
        {/* Compass heading ("Eastbound", recovered from route+directionId — this is
            what BusTime sent as rtdir) followed by the headsign, verbatim from GTFS. */}
        <span className="text-sm text-gray-700">
          {trip && trip.direction && <span className="font-bold">{trip.direction}</span>}
          {trip && trip.headsign && (
            <span className={trip.direction ? "text-gray-600 ml-2" : "font-bold"}>{trip.headsign}</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Prediction;
