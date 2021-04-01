import { faBusAlt, faClock, faMap, faMapSigns, faRss } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import PageTitle from '../components/PageTitle';
import Prediction from "../components/Prediction";
import { RoutesHere } from "../components/RoutesHere";
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

const NextArrivals = ({ routeFeatures, predictions, currentTrip, setCurrentTrip }) => {

  let nextBuses = predictions['bustime-response'].prd

  return (
    <SiteSection icon={faRss} title="Next arrivals here" fullWidth expands>
      {nextBuses.slice(0,4).map((nb, i) => <Prediction prediction={nb} last={i === nextBuses.length - 1} key={nb.vid} {...{currentTrip, setCurrentTrip, routeFeatures}} />)}
    </SiteSection>
  )
}

const StopPage = ({ data }) => {
  const s = data.postgres.stop;

  let { stopLon, stopLat, stopName, routes, times } = s;

  const allRoutes = data.routes.edges.map(e => e.node);

  let routeDirectionCombos = Array.from(new Set(times.map(t => JSON.stringify([t.trip.route.routeShortName, t.trip.directionId]))))
  let stopRoutes = []

  allRoutes.forEach(r => {
    if(routeDirectionCombos.indexOf(JSON.stringify([r.short, r.directionId])) > -1) {
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

  const [currentRoute, setCurrentRoute] = useState(routes[0].short)

  const [currentTrip, setCurrentTrip] = useState(null)

  useEffect(() => {
    fetch(`/.netlify/functions/stop?stopId=${s.stopCode}`)
      .then(r => r.json())
      .then(d => {
        if (d['bustime-response'].prd && d['bustime-response'].prd.length > 0) {
          setPredictions(d)
        }
        else { return; }
      })
  }, [s.stopId, s.stopCode])

  return (
    <>
      <PageTitle icon={faBusAlt}>
        <h1 className="m-0 font-thin">{s.stopName}</h1> 
        <h2 className="text-base font-thin text-gray-700 bg-white py-0 px-2 m-0 mr-3">#{s.stopCode}</h2>
      </PageTitle>
      {predictions && <NextArrivals {...{ routeFeatures, predictions, currentTrip, setCurrentTrip }} />}
      <SiteSection fullWidth title='Routes at this stop' icon={faMapSigns}>
        <RoutesHere {...{ routes, currentRoute, setCurrentRoute }} />
      </SiteSection>
      <SiteSection icon={faMap} title={`Stop map`} fullWidth expands>
        <StopMap {...{ stopLon, stopLat, stopName, routeFeatures, currentRoute, currentTrip, predictions }} />
      </SiteSection>

      <SiteSection fullWidth title='Scheduled arrivals here' icon={faClock} expands startsClosed className="mb-0">
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
      stop: stopByFeedIndexAndStopId(stopId: $stopId, feedIndex: 1) {
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
          }
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