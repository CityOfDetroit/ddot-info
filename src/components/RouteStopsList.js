import React from "react";
import SiteSection from "./SiteSection";
import { StopListItem } from "./StopListItem";

export const RouteStopsList = ({ longTrips, direction, routeColor, className, small = false, timepointsOnly = false }) => {

  let modelTrip = longTrips.filter(lt => lt.directionId === direction)[0];

  let times = modelTrip.stopTimes
  
  if(timepointsOnly) {
    times = times.filter(st => st.timepoint === 1)
  }

  return (
    <SiteSection className={small ? "grid w-100 col-span-2 overflow-y-auto px-2 text-sm section-scroll" : "grid w-100 col-span-2 overflow-y-auto px-2 section-scroll"} fullWidth scroll>
      {times.map((stopTime, i) => (
        <StopListItem key={stopTime.stop.stopCode} {...{ stopTime, routeColor }} small={small} />
      ))}
    </SiteSection>
  );
};
