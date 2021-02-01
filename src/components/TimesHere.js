import { faClock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SectionHeader from './SectionHeader';
import ServicePicker from './ServicePicker';
import { arrivalTimeDisplay } from "../templates/stop-page";

export const TimesHere = ({ currentRoute, times }) => {
  
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
  let currentService = services[0];
  if (dow === 0 && services.length > 1) { currentService = "2"}
  if (dow === 6 && services.length > 1) { currentService = "3"}
  const [service, setService] = useState(currentService);
  let timesToShow = times.filter(t => t.trip.route.routeShortName === currentRoute && t.trip.serviceId === service);

  return (
    <section>
      <SectionHeader icon={faClock} title={`Scheduled arrivals at this stop:`} />
      <ServicePicker {...{services, service, setService}} />
      <section
        className="py-2"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(timesToShow.length / 5)}, 22px)`,
          ...gridStyle
        }}>
        {timesToShow.map((st, i) => (
          <div
            key={st.trip.tripId}
            style={{
              ...cellStyle,
              borderLeft: i / timesToShow.length < 0.2 ? `0px solid #eee` : `1.5px solid #eee`,
              fontWeight: st.arrivalTime.hours >= 12 && st.arrivalTime.hours <= 23 ? 600 : 400
            }}
          >
            {arrivalTimeDisplay(
              st.arrivalTime,
              i === 0 || i === timesToShow.length - 1 || (st.arrivalTime.hours === 12 && timesToShow[i - 1].arrivalTime.hours === 11) ? true : false
            )}
          </div>
        ))}
      </section>
    </section>
  );
};
