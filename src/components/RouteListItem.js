import { faBus, faClock, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import RouteLinks from "./RouteLinks";
import { Link } from 'gatsby'
import RouteTitle from './RouteTitle';
import SiteButton from "./SiteButton";

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
  let [open, setOpen] = useState(false)
  return (
    <div className="bg-gray-100 p-2 border-b-2" key={route.short}>
      <div className="flex items-center justify-between">
        <RouteTitle short={route.short} long={route.long} color={route.color} bold={false} size="base" />
        {/* <FontAwesomeIcon className="pr-2" size="2x" icon={open ? faChevronCircleDown : faChevronCircleRight} onClick={() => setOpen(!open)} /> */}
        <div className="w-1/2 flex items-center flex-row-reverse">
          <RouteButton className="ml-3" icon={faBus} text='Stops' link={`/route/${route.short}/stops`} ariaLabel={`Stops for ${route.long}`} />
          <RouteButton className="ml-3" icon={faClock} text='Schedule' link={`/route/${route.short}/schedule`} ariaLabel={`Schedule for ${route.long}`} />
        </div>
      </div>
      {/* {open && 
        <RouteLinks number={route.short} />
      } */}
    </div>
  )
}

export default RouteListItem;