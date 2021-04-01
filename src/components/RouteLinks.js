import { faBus, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby";
import React from "react";

const RouteLinks = ({ number }) => {
  return (
    <div>
      <Link to={`/route/${number}/stops`} aria-label={`route ${number} stops page`} prefetch={"false"}>
        <span>Bus stops</span>
        <FontAwesomeIcon icon={faBus} className='opacity-25 mx-3 text-lg' />
      </Link>
      <Link to={`/route/${number}/schedule`} aria-label={`route ${number} schedule page`} prefetch={"false"}>
        <span>Schedule</span>
        <FontAwesomeIcon icon={faClock} className='opacity-25 mx-3 text-lg' />
      </Link>
    </div>
  );
};

export default RouteLinks;
