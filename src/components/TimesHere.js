import { faClock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SectionHeader from './SectionHeader';
import ServicePicker from './ServicePicker';
import { arrivalTimeDisplay } from "../templates/stop-page";
import _ from 'lodash'
import RouteTitle from './RouteTitle'
import SiteSection from "./SiteSection";

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

  let now = new Date
  let dow = now.getDay()
  let currentService = "1";
  if (dow === 0 && services.length > 1) { currentService = "2" }
  if (dow === 6 && services.length > 1) { currentService = "3" }

  const [service, setService] = useState(currentService);
  let timesToShow = times.filter(t => t.trip.serviceId === service);
  let timesByRoute = _.groupBy(timesToShow, (t) => t.trip.route.routeShortName)

  return (
    <>
      <ServicePicker {...{ services, service, setService }} expands={false} startsClosed={false} className="mb-0" />
      {Object.keys(timesByRoute).map(r => {
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
      })}
    </>
  );
};
