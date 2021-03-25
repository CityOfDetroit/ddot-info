import { graphql } from "gatsby";
import React, { useState } from "react";

import Layout from '../components/layout';
import { RouteTitle } from '../components/RouteSign'
import DirectionPicker from '../components/DirectionPicker'
import { RouteStopsList } from "../components/RouteStopsList";

const RouteStopsPage = ({ data }) => {

  let ddotRoutes = data.allDdotRoute.edges.map(e => e.node);
  let routeOrientation;

  if (ddotRoutes[0].direction === 'Northbound' || ddotRoutes[0].direction === 'Southbound') {
    routeOrientation = 'NS'
  }
  if (ddotRoutes[0].direction === 'Eastbound' || ddotRoutes[0].direction === 'Westbound') {
    routeOrientation = 'EW'
  }
  if (ddotRoutes[0].direction === 'Loop') {
    routeOrientation = 'CW'
  }

  let r = data.postgres.route[0];

  // pull trips and longTrips out of the route object
  let { longTrips, routeColor } = r

  // get directions
  let directions = longTrips.map(lt => lt.directionId)
  let [direction, setDirection] = useState(directions[0])

  return (
    <Layout>
      <RouteTitle short={r.routeShortName} long={r.routeLongName} color={r.routeColor} />
      <h2 className="text-xl mt-2">Stops</h2>
      <section>
      </section>
      <section className="">
        <DirectionPicker {...{ directions, direction, setDirection, routeOrientation }} />
        <section className="bg-gray-100 flex items-center p-2">
          <p className="flex items-center mr-3">Major stops: <span
            style={{
              display: "inline-block",
              height: "1em",
              width: "1em",
              backgroundColor: "#000",
              border: "1px solid #000",
              borderRadius: "3em",
              margin: ".25em"
            }}
          /></p>
          <p className="flex items-center">Local stops: <span
            style={{
              display: "inline-block",
              height: "1em",
              width: "1em",
              backgroundColor: "#fff",
              border: `3px solid #${r.routeColor}`,
              borderRadius: "3em",
              margin: ".25em"
            }}
          /></p>
        </section>
        <RouteStopsList {...{ longTrips, direction, routeColor }} />
      </section>
    </Layout>
  );
};

export const query = graphql`
query($routeNo: String!) {
  allDdotRoute(filter: {short: {eq: $routeNo}}) {
    edges {
      node {
        id
        direction
        short
      }
    }
  }
  postgres {
    route: allRoutesList(
      condition: { routeShortName: $routeNo, feedIndex: 1 }
    ) {
      agencyId
      routeShortName
      routeLongName
      routeDesc
      routeType
      routeUrl
      routeColor
      routeTextColor
      routeSortOrder
      longTrips: longestTripsList {
        tripHeadsign
        directionId
        stopTimes: stopTimesByFeedIndexAndTripIdList(orderBy: STOP_SEQUENCE_ASC) {
          stopSequence
          timepoint
          arrivalTime {
            seconds
            minutes
            hours
          }
          stop: stopByFeedIndexAndStopId {
            stopId
            stopCode
            stopName
            stopLat
            stopLon
          }
        }
      }
      trips: tripsByFeedIndexAndRouteIdList {
        id: tripId
        headsign: tripHeadsign
        direction: directionId
        service: serviceId
        stopTimes: stopTimesByFeedIndexAndTripIdList(condition: { timepoint: 1 }) {
          timepoint
          arrivalTime {
            hours
            minutes
            seconds
          }
          stop: stopByFeedIndexAndStopId {
            stopId
            stopCode
            stopName
            stopLat
            stopLon
          }
        }
      }
    }
  }
}

`;

export default RouteStopsPage;