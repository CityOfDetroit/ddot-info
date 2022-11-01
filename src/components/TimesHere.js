import React, { useState } from "react";
import ServicePicker from './ServicePicker';
import { arrivalTimeDisplay } from "./arrivalTimeDisplay";
import _ from 'lodash'
import RouteTitle from './RouteTitle'
import SiteSection from "./SiteSection";
import allRoutes from '../data/allRoutes.json';
import directions from '../data/directions.json';

const arrivalTimeDisplay = (time, showAp) => {
  let hour = time.hours;
  let minutes = time.minutes ? time.minutes.toString().padStart(2, "0") : "00";
  let ap = "a";

  // vary hours & am/pm based on what hour it is
  // gtfs has hours that are greater than 24
  if (time.hours < 12 && time.hours > 0) {
    hour = time.hours;
    ap = "a";
  } else if (time.hours > 12 && time.hours < 24) {
    hour = time.hours - 12;
    ap = "p";
  } else if (time.hours % 12 === 0) {
    hour = 12;
    ap = time.hours === 12 ? "p" : "a";
  } else if (time.hours >= 24) {
    hour = time.hours - 24;
    ap = "a";
  }

  return `${hour}:${minutes}${showAp ? ap : ``}`;
};

export const TimesHere = ({ currentRoute, times, routes }) => {

  const cellStyle = {
    textAlign: "center",
    verticalAlign: "center",
    letterSpacing: "-0.05rem",
    borderLeft: "1px solid #eee"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(50px, 1fr))`,
    gridAutoFlow: "column",
    maxWidth: 400
  };

  const services = [...new Set(times.map(t => t.trip.serviceId))];

  let now = new Date()
  let dow = now.getDay()
  let currentService = "2";
  if (dow === 0 && services.length > 1) { currentService = "3" }
  if (dow === 6 && services.length > 1) { currentService = "4" }

  const [service, setService] = useState(currentService);
  let timesToShow = times.filter(t => t.trip.serviceId === service && t.stopSequence < t.trip.stopTimesByFeedIndexAndTripId.totalCount);
  let timesByRoute = _.groupBy(timesToShow, (t) => t.trip.route.routeShortName)

  return (
    <>
      <ServicePicker {...{ services, service, setService }} expands={false} startsClosed={false} className="mb-0" />
      {Object.keys(timesByRoute).map(r => {
        let groupedByDir = _.groupBy(timesByRoute[r], (t) => t.trip.directionId)

        if(Object.keys(groupedByDir).length === 1) {
          let filtered = routes.filter(rt => r === rt.short)[0]
          return (
            <SiteSection key={r} title={ <RouteTitle size="small" short={r} color={filtered.color} long={filtered.long} />}>
             
              <div
                className="mb-3"
                style={{
                  gridTemplateRows: `repeat(${Math.ceil(timesByRoute[r].length / 5)}, 22px)`,
                  ...gridStyle
                }}>
                {timesByRoute[r].map((st, i) => (
                  <div
                    key={st.trip.tripId}
                    className="tabular"
                    style={{
                      ...cellStyle,
                      borderLeft: i / timesByRoute[r].length < 0.2 ? `0px solid #eee` : `1.5px solid #eee`,
                      fontWeight: st.arrivalTime.hours >= 12 && st.arrivalTime.hours <= 23 ? 600 : 400
                    }}
                  >
                    {arrivalTimeDisplay(
                      st.arrivalTime,
                      i === 0 || i === timesByRoute[r].length - 1 || (st.arrivalTime.hours === 12 && timesByRoute[r][i - 1].arrivalTime.hours === 11) ? true : false
                    )}
                  </div>
                ))}
              </div>
            </SiteSection>
          )
        }
        else {
          let filtered = routes.filter(rt => r === rt.short)[0]
          let rt = allRoutes.find(ar => ar.RouteNum === parseInt(r))
          let lookup = {
            "North - South": "NS",
            "East - West": "EW",
            "Loop": "CW"
          }
          return (
            <>
            <SiteSection key={r} title={ <RouteTitle size="small" short={r} color={filtered.color} long={`${filtered.long} (${directions[lookup[rt.Orientatio]]["0"]})`} />}>
              <div
                className="mb-3 tabular"
                style={{
                  gridTemplateRows: `repeat(${Math.ceil(timesByRoute[r].length / 5)}, 22px)`,
                  ...gridStyle
                }}>
                {timesByRoute[r].filter(tbr => tbr.trip.directionId === 0 && tbr.stopSequence < tbr.trip.stopTimesByFeedIndexAndTripId.totalCount).map((st, i) => (
                  <div
                    key={st.trip.tripId}
                    style={{
                      ...cellStyle,
                      borderLeft: i / timesByRoute[r].length < 0.2 ? `0px solid #eee` : `1.5px solid #eee`,
                      fontWeight: st.arrivalTime.hours >= 12 && st.arrivalTime.hours <= 23 ? 600 : 400
                    }}
                  >
                    {arrivalTimeDisplay(
                      st.arrivalTime,
                      i === 0 || i === timesByRoute[r].filter(tbr => tbr.trip.directionId === 0 && tbr.stopSequence < tbr.trip.stopTimesByFeedIndexAndTripId.totalCount).length - 1 || (st.arrivalTime.hours > 11 && timesByRoute[r].filter(tbr => tbr.trip.directionId === 0 && tbr.stopSequence < tbr.trip.stopTimesByFeedIndexAndTripId.totalCount)[i - 1].arrivalTime.hours < 12) ? true : false
                    )}
                  </div>
                ))}
              </div>
            </SiteSection>
            <SiteSection key={r} title={ <RouteTitle size="small" short={r} color={filtered.color} long={`${filtered.long} (${directions[lookup[rt.Orientatio]]["1"]})`} />}>
              <div
                className="mb-3 tabular"
                style={{
                  gridTemplateRows: `repeat(${Math.ceil(timesByRoute[r].length / 5)}, 22px)`,
                  ...gridStyle
                }}>
                {timesByRoute[r].filter(tbr => tbr.trip.directionId === 1 && tbr.stopSequence < tbr.trip.stopTimesByFeedIndexAndTripId.totalCount).map((st, i) => (
                  <div
                    key={st.trip.tripId}
                    style={{
                      ...cellStyle,
                      borderLeft: i / timesByRoute[r].length < 0.2 ? `0px solid #eee` : `1.5px solid #eee`,
                      fontWeight: st.arrivalTime.hours >= 12 && st.arrivalTime.hours <= 23 ? 600 : 400
                    }}
                  >
                    {arrivalTimeDisplay(
                      st.arrivalTime,
                      i === 0 
                      || 
                      i === timesByRoute[r].filter(tbr => tbr.trip.directionId === 1 && tbr.stopSequence < tbr.trip.stopTimesByFeedIndexAndTripId.totalCount).length - 1 
                      || 
                      (st.arrivalTime.hours > 11 && timesByRoute[r].filter(tbr => tbr.trip.directionId === 1 && tbr.stopSequence < tbr.trip.stopTimesByFeedIndexAndTripId.totalCount)[i - 1].arrivalTime.hours < 12) 
                      ? true : false
                    )}
                  </div>
                ))}
              </div>
            </SiteSection>
            </>
          )
        }
      })}
    </>
  );
};
