import { faRss } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Prediction from "./Prediction";
import SiteSection from "./SiteSection";

export const NextArrivals = ({ routeFeatures, predictions, tripInfo, currentTrip, setCurrentTrip }) => {

  let nextBuses = predictions.arrivals.slice(0, 4);

  // null = loading, [] = no vehicle data
  let [vehicles, setVehicles] = useState(null)

  // The whole fleet on a parameterless URL (~4 KB gzipped, one CDN cache key), so
  // looking up the buses for this stop is a local filter. This is what replaced the
  // old per-vid vehicle.js call.
  useEffect(() => {
    let cancelled = false
    fetch(`/.netlify/functions/feed-vehicles`)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then(d => {
        if (!cancelled) setVehicles(d.features)
      })
      .catch(() => {
        if (!cancelled) setVehicles([])
      })
    return () => {
      cancelled = true
    }
  }, [predictions])

  return (
    <SiteSection icon={faRss} title="Next buses at this stop" subtitle={`Tap ${!currentTrip ? `to track this bus on the map` : `to stop tracking this bus`}`} fullWidth expands>
      {vehicles && nextBuses.map((arrival, i) => (
        <Prediction
          prediction={arrival}
          trip={tripInfo[arrival.tripId]}
          last={i === nextBuses.length - 1}
          key={arrival.tripId}
          // null when Swiftly is predicting a trip with no bus assigned yet — the
          // arrival time is still real, so we show it without a bus to track.
          vehicle={arrival.vid ? vehicles.find(v => v.properties.vid === arrival.vid) || null : null}
          {...{ currentTrip, setCurrentTrip, routeFeatures }} />
      ))}
    </SiteSection>
  );
};
