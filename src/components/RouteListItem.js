import { faBus, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';
import RouteTitle from './RouteTitle';

export const RouteButton = ({ icon, text, ariaLabel, link, className }) => {
  return (
    <Link to={link}>
      <button className={className + " p-1 text-gray-600 flex items-center"}>
        <FontAwesomeIcon icon={icon} className="mr-1" />
        <span className="underline text-sm">{text}</span>
      </button>
    </Link>
  )
}

const RouteListItem = ({ route }) => {
  return (
    <div className="bg-gray-100 p-2 border-b-2" key={route.short}>
      <div className="flex items-center justify-between">
        <RouteTitle short={route.short} long={route.long} color={route.color} bold={false} size="base" />
        <div className="w-1/2 flex items-center flex-row-reverse">
          <RouteButton className="ml-3" icon={faBus} text='Stops' link={`/route/${route.short}/stops`} ariaLabel={`Stops for ${route.long}`} />
          <RouteButton className="ml-3" icon={faClock} text='Schedule' link={`/route/${route.short}/schedule`} ariaLabel={`Schedule for ${route.long}`} />
        </div>
      </div>
    </div>
  )
}

export default RouteListItem;