import { faMap, faRss } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import StopMap from "../components/StopMap";
import SectionHeader from '../components/SectionHeader';
import SectionContainer from '../components/SectionContainer'
import { TimesHere } from "../components/TimesHere";
import { RoutesHere } from "../components/RoutesHere";
import Prediction from "../components/Prediction";

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

const StopHeader = ({ stop }) => (
  <section className="flex items-center px-2 justify-between">
      <h1 className="font-bold text-lg">{stop.stopName}</h1> 
      <h2 className="text-md text-gray-700 bg-gray-200 p-2 mx-3">#{stop.stopCode}</h2>
  </section>
)

const NextArrivals = ({ routeFeatures, predictions, currentTrip, setCurrentTrip }) => {

  let nextBuses = predictions['bustime-response'].prd

  return (
    <SectionContainer>
      <SectionHeader icon={faRss} title="Next arrivals here" />
      {nextBuses.map((nb, i) => <Prediction prediction={nb} key={nb.vid} {...{currentTrip, setCurrentTrip, routeFeatures}} />)}
    </SectionContainer>
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
    <Layout gridClass='stop-grid'>
      <div>
        <StopHeader {...{ stop: s }} />
        <SectionContainer>
          <SectionHeader icon={faMap} title={`Stop map`} />
          <StopMap {...{ stopLon, stopLat, stopName, routeFeatures, currentRoute, currentTrip, predictions }} />
        </SectionContainer>
        {predictions && <NextArrivals {...{ routeFeatures, predictions, currentTrip, setCurrentTrip }} />}
      </div>
      <div>
        <RoutesHere {...{ routes, currentRoute, setCurrentRoute }} />
        <TimesHere {...{ times, currentRoute }} />
        {/* <StopTransfers /> */}
      </div>
    </Layout>
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