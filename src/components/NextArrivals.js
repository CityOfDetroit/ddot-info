import { faRss } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Prediction from "./Prediction";
import SiteSection from "./SiteSection";

export const NextArrivals = ({ routeFeatures, predictions, currentTrip, setCurrentTrip }) => {

  let nextBuses = predictions['bustime-response'].prd;

  let [data, setData] = useState(null)

  useEffect(() => {
    fetch(`/.netlify/functions/vehicle?vid=${nextBuses.slice(0,4).map(nb => nb.vid).toString()}`)
      .then(r => r.json())
      .then(d => {
        if (d['bustime-response'].vehicle && d['bustime-response'].vehicle.length > 0) {
          setData(d['bustime-response'].vehicle)
        }
        else { return; }
      })
  }, [predictions])

  return (
    <SiteSection icon={faRss} title="Next arrivals here" fullWidth expands>
      {data && nextBuses.slice(0, 4).map((nb, i) => {
          return (<Prediction
            prediction={nb}
            last={i === nextBuses.length - 1}
            key={nb.vid}
            vehicle={data.filter(d => d.vid === nb.vid)[0]}
            {...{ currentTrip, setCurrentTrip, routeFeatures }} />)
        })}
    </SiteSection>
  );
};
