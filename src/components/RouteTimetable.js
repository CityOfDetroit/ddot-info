import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';

const arrivalTimeDisplay = (time, showAp) => {
  let hour = time.hours;
  let minutes = time.minutes ? time.minutes.toString().padStart(2, "0") : "00";
  let ap = "am";

  // vary hours & am/pm based on what hour it is
  // gtfs has hours that are greater than 24
  if (time.hours < 12 && time.hours > 0) {
    hour = time.hours;
    ap = "am";
  } else if (time.hours > 12 && time.hours < 24) {
    hour = time.hours - 12;
    ap = "pm";
  } else if (time.hours % 12 === 0) {
    hour = 12;
    ap = time.hours === 12 ? "pm" : "am";
  } else if (time.hours >= 24) {
    hour = time.hours - 24;
    ap = "am";
  }

  return `${hour}:${minutes} ${ap}`;
};

const RouteTimetable = ({ trips, longTrips, service, direction, routeColor }) => {

  let tripsToShow = trips.filter(t => {
    return (t.service === service && t.direction === direction)
  })

  if(tripsToShow.length === 0) {
    tripsToShow = trips.filter(t => {
      return (t.direction === direction)
    })
  }

  // We have to sort these routes somewhat elaborately;
  // Let's find the timepoint that occurs amongst the most trips and sort by time on that.

  // find the trip with the most stopTimes
  const mostTimepointsTrip = tripsToShow.sort((a, b) => {
    return b.stopTimes.length - a.stopTimes.length;
  })[0];

  // get the timepoints for that trip
  const timepoints = mostTimepointsTrip.stopTimes;

  // sort by frequency
  let stopIdOccurences = tripsToShow.map(t => t.stopTimes.map(s => s.stop.stopId));

  let defaultTimepoint = 0;

  // we iterate through the timepoints and find the most frequent one
  timepoints
    .map(t => t.stop.stopId)
    .some((tp, j) => {
      let included = stopIdOccurences.map(sio => sio.includes(tp));
      if (included.every(i => i)) {
        defaultTimepoint = tp;
        return true;
      } else {
        return false;
      }
    });

  let sorted = tripsToShow.sort((a, b) => {
    let aStopTime = a.stopTimes.filter(st => st.stop.stopId === defaultTimepoint)[0].arrivalTime;
    let bStopTime = b.stopTimes.filter(st => st.stop.stopId === defaultTimepoint)[0].arrivalTime;

    return aStopTime.hours * 60 + aStopTime.minutes - (bStopTime.hours * 60 + bStopTime.minutes);
  });

  let borderedRowStyle = {
    borderBottom: `2px solid #${routeColor}`
  }

  return (
    <div style={{width: '100%', overflow: 'auto', maxHeight: 'calc(100vh - 94px)'}}>

    <table className="tabular" style={{tableLayout: 'fixed'}}>
      <thead className="z-10 mt-2" style={{ position: 'sticky' }}>
        <tr style={{ position: 'sticky' }}>
          {timepoints.map((s, k) => (
            <th key={`${s.stop.stopCode} + ${k}`} className="text-sm pt-2 timetable-header w-40 p-0 p-0 bg-white">
              <div className="flex flex-col items-center justify-end h-20 bg-white">
                <Link to={`/stop/${s.stop.stopCode}`} className="leading-tight text-sm font-bold bg-white mb-2 px-2">
                  {s.stop.stopName
                    .replace(" - Deboarding", "")
                    .replace("Transit Center", "TC")
                    .replace("Martin Luther King", "MLK")}
                </Link>
                <FontAwesomeIcon icon={faChevronCircleRight} size="lg" className="relative z-10 bg-white text-gray-700" />
              </div>
              <div style={{
                position: 'absolute',
                right: k === 0 ? -5 : null,
                height: ".5em",
                bottom: ".5em",
                zIndex: 1,
                width: (k === 0 || k + 1 === timepoints.length) ? "55%" : "100%",
                backgroundColor: `#${routeColor === 'FFFFFF' ? '5f6369' : routeColor}`,
                verticalAlign: "center"
              }} />
            </th>
          ))}
        </tr>

      </thead>
      <tbody>

        {sorted.map((t, i) => (
          <tr key={t.id} style={(i + 1) % 5 === 0 ? borderedRowStyle : {}}>
            {timepoints.map((tp, j) => {
              let filtered = t.stopTimes.filter(st => {
                return st.stop.stopId === tp.stop.stopId;
              });
              if (filtered.length === 0) {
                return (
                  <td key={`${t.id}-${i}-${j}`}
                    className={`text-center timetable-entry bg-gray-100 text-gray-600`}>
                    -
                  </td>
                )
              };
              if (filtered.length > 1) {
                let indices = timepoints.map(t => t.stop.stopId === tp.stop.stopId).reduce((a, e, i) => (e === true) ? a.concat(i) : a, [])
                let value = indices.indexOf(j)
                return (
                  <td key={`${t.id}-${i}-${j}`}
                    className={`text-center text-sm border-r-2 timetable-entry ${arrivalTimeDisplay(filtered[value].arrivalTime).indexOf("p") > -1 ? `font-semibold` : `font-base`}`}>
                    {arrivalTimeDisplay(filtered[value].arrivalTime).slice(0, -3)}
                  </td>
                )
              }
              return (
                <td key={`${t.id}-${i}-${j}`}
                  className={`text-center text-sm  border-r-2 border-opacity-25 border-dotted border-gray-700 z-0 timetable-entry ${filtered.length === 0 && `bg-gray-100`} ${arrivalTimeDisplay(filtered[0].arrivalTime).indexOf("p") > -1 ? `font-semibold` : `font-base`}`}>
                  {filtered.length > 0 ?
                    arrivalTimeDisplay(filtered[0].arrivalTime).slice(0, -3) :
                    `-`
                  }
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  )
}

export default RouteTimetable;