import { faBusAlt, faClock, faDoorClosed, faMap, faMapSigns } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Helmet from 'react-helmet';
import { NextArrivals } from "../components/NextArrivals";
import PageTitle from '../components/PageTitle';
import { RoutesHere } from "../components/RoutesHere";
import ServiceSuspended from "../components/ServiceSuspended";
import SiteSection from "../components/SiteSection";
import StopMap from "../components/StopMap";
import { TimesHere } from "../components/TimesHere";

export const arrivalTimeDisplay = (time, showAp) => {
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

const StopPage = ({ data }) => {
  const s = data.postgres.stop;

  let { stopLon, stopLat, stopName, routes, times } = s;

  const allRoutes = data.routes.edges.map(e => e.node);

  let routeDirectionCombos = Array.from(new Set(times.map(t => JSON.stringify([t.trip.route.routeShortName, t.trip.directionId]))))
  let stopRoutes = []

  allRoutes.forEach(r => {
    if (routeDirectionCombos.indexOf(JSON.stringify([r.short, r.directionId])) > -1) {
      stopRoutes.push(r)
    }
  })

  let routeFeatures = stopRoutes.map(i => {
    let { route, ...properties } = i
    let color = routes.filter(r => r.short === properties.short)[0].color
    properties.color = '#' + color
    return { ...route, properties: properties }
  })

  const [predictions, setPredictions] = useState(null)

  const [currentRoute, setCurrentRoute] = useState(routes.length > 0 ? routes[0].short : null) 

  const [currentTrip, setCurrentTrip] = useState(null)

  // set up a 10s 'tick' using `now`
  let [now, setNow] = useState(new Date());
  useEffect(() => {
    let tick = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    fetch(`/.netlify/functions/stop?stopId=${s.stopCode}`)
      .then(r => r.json())
      .then(d => {
        if (d['bustime-response'].prd && d['bustime-response'].prd.length > 0) {
          setPredictions(d)
        }
        else { return; }
      })
  }, [s.stopId, s.stopCode, now])

  useEffect(() => {
    if (currentTrip) {
      setCurrentRoute(currentTrip.rt)
    }
    else {
      return;
    }
  }, [currentTrip])

  return (
    <>
      <Helmet>
        <title>{`DDOT.info: ${s.stopName} #${s.stopCode}`}</title>
        <meta property="og:url" content={`https://ddot.info/stop/${s.stopCode}`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`DDOT bus stop: ${s.stopName}`} />
        <meta property="og:description" content={`DDOT bus stop #${s.stopCode}, at ${s.stopName}. Routes that stop here: ${[...new Set(routeFeatures.map(rf => rf.properties.long))].join(", ")}`} />
      </Helmet>
      <PageTitle icon={faBusAlt}>
        <h1 className="m-0 font-thin">{s.stopName}</h1>
        <h2 className="text-base font-thin text-gray-700 bg-white py-0 px-2 m-0">#{s.stopCode}</h2>
      </PageTitle>
      {times.length === 0 && <ServiceSuspended at='stop' />}
      {predictions && <NextArrivals {...{ routeFeatures, predictions, currentTrip, setCurrentTrip }} />}
      <SiteSection icon={faMap} title={`Stop map`} fullWidth expands>
        <StopMap {...{ stopLon, stopLat, stopName, routeFeatures, currentRoute, currentTrip, predictions }} />
      </SiteSection>
      <SiteSection fullWidth title='Routes at this stop' icon={faMapSigns} expands>
        <RoutesHere {...{ routes, currentRoute, setCurrentRoute }} />
      </SiteSection>
      <SiteSection fullWidth title='Scheduled departures' icon={faClock} expands className="mb-0">
        <TimesHere {...{ times, currentRoute, routes }} />
        {/* <StopTransfers /> */}
      </SiteSection>
    </>
  );
};

export const query = graphql`
  query($stopId: String!) {
    routes: allDdotRoute {
      edges {
        node {
          id
          days
          description
          direction
          orientation
          directionId
          long
          localService
          RouteType: routeType
          route {
            type
            geometry {
              coordinates
              type
            }
          }
          short
        }
      }
    }
    postgres {
      stop: stopByFeedIndexAndStopId(stopId: $stopId, feedIndex: 8) {
        stopId
        stopCode
        stopName
        stopLat
        stopLon
        routes: routesList {
          short: routeShortName
          long: routeLongName
          color: routeColor
        }
        nearby: nearbyStopsList {
          stopId
          stopName
          stopLat
          stopLon
          routes: routesList {
            routeShortName
            routeLongName
            routeColor
          }
        }
        times: stopTimesByFeedIndexAndStopIdList(orderBy: ARRIVAL_TIME_ASC) {
          trip: tripByFeedIndexAndTripId {
            tripId
            route: routeByFeedIndexAndRouteId {
              routeColor
              routeTextColor
              routeShortName
              routeLongName
              agencyId
            }
            directionId
            serviceId
            tripHeadsign
            stopTimesByFeedIndexAndTripId {
              totalCount
            }
          }
          stopSequence
          arrivalTime {
            hours
            minutes
            seconds
          }
        }
      }
    }
  }
`;

export default StopPage;