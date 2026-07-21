import React from 'react';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { keyboardActivate } from './keyboardActivate';
import { cleanHeadsign } from './cleanHeadsign';

export const Vehicle = ({ vehicle, longTrips, stopNames, directionsById, tracked, setTracked }) => {

  let { vid, directionId, stopId, status } = vehicle.properties;

  // Compass heading ("Eastbound"), recovered from directionId. This is what BusTime
  // sent as rtdir; GTFS-rt has no equivalent, so it comes from the route's shapes.
  let directionLabel = directionsById ? directionsById[directionId] : null;

  // The headsign riders see on the bus, matched by direction.
  // Rendered verbatim: the feed mixes plain destinations ("7 Mile") with
  // route-prefixed ones ("3 to Downtown"), so any "To " prefix we add reads wrong
  // half the time. This matches what's on the front of the bus.
  let heading = longTrips.find(lt => lt.directionId === directionId);
  let headsign = heading ? cleanHeadsign(heading.tripHeadsign) : null;

  // GTFS-rt reports the stop directly, so there is no pattern geometry to walk:
  // STOPPED_AT means stopId is where the bus is, otherwise it's where it's going.
  let stopName = stopId ? stopNames[stopId] : null;
  let atStop = status === 'STOPPED_AT';

  let isLive = tracked === vid;
  let toggle = () => { isLive ? setTracked(null) : setTracked(vid); };

  return (
    <div className="flex items-center"
      key={vid}
      onClick={toggle}
      onKeyDown={keyboardActivate(toggle)}
      role="button"
      tabIndex={0}
      aria-pressed={isLive}
    >
      <div className={isLive ? "bg-yellow-200 w-full p-3 border-b-2" : "bg-gray-100 w-full p-3 border-b-2"}>
        <div className="flex items-center justify-between">
          <span className="leading-tight">
            {directionLabel && <span className="font-bold">{directionLabel}</span>}
            {headsign && <span className={directionLabel ? "text-gray-600 ml-2" : ""}>{headsign}</span>}
            {!directionLabel && !headsign && `-`}
          </span>
          <span className="text-sm">{stopName ? (atStop ? `at:` : `next stop:`) : `-`}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 leading-tight">
            <FontAwesomeIcon icon={faBus} className={isLive ? "text-xl mr-1" : "text-xl mr-1 text-gray-500 "} />
            #{vid}
          </span>
          <span className="text-sm">{stopName ? `${stopName}` : `end of route`}</span>
        </div>
      </div>
    </div>
  );
};
