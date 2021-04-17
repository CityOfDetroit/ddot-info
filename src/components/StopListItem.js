import { Link } from "gatsby";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";


export const StopListItem = ({ stopTime, routeColor, small=false }) => {

  let liStyle = {
    borderColor: `#${routeColor}`,
  };

  let normalStopStyle = {
    borderColor: `#${routeColor}`,
    backgroundColor: `white`,
  };

  let timepointStyle = {
    borderColor: `black`,
    backgroundColor: `black`,
  };

  return (
    <div className={"flex items-center border-l-4 py-2 ml-2"} style={liStyle} key={stopTime.stop.stopCode}>
      <span className={small ? `w-3 h-3 rounded-full border-4 -ml-2` : `w-5 h-5 rounded-full border-4 -ml-3`} style={stopTime.timepoint ? timepointStyle : normalStopStyle}></span>
      <Link to={`/stop/${stopTime.stop.stopCode}`} aria-label={`Stop page for stop ${stopTime.stop.stopName}`}>
        <span className="ml-2">{stopTime.stop.stopName.replace("Rosa Parks Transit Center - Deboarding", "Rosa Parks TC")}</span>
        <span className="text-xs text-gray-700 bg-gray-200 p-1 mx-3">#{stopTime.stop.stopCode}</span>
      </Link>
    </div>
  );
};
