import { Link, graphql } from "gatsby";
import React, { useState } from "react";

import Layout from '../components/layout'
import {RouteTitle} from '../components/RouteSign'
import { RouteNumber } from "../components/RouteNumber";
import DirectionPicker from '../components/DirectionPicker'
import ServicePicker from "../components/ServicePicker";
import RouteTimetable from "../components/RouteTimetable";

const RouteSchedulePage = ({ data }) => {

  let ddotRoutes = data.allDdotRoute.edges.map(e => e.node);
  let routeOrientation;

  // this is a hack. we should try to remove it.
  if (ddotRoutes[0].direction === 'Northbound' || ddotRoutes[0].direction === 'Southbound') {
    routeOrientation = 'NS'
  }
  if (ddotRoutes[0].direction === 'Eastbound' || ddotRoutes[0].direction === 'Westbound') {
    routeOrientation = 'EW'
  }
  if (ddotRoutes[0].direction === 'Loop') {
    routeOrientation = 'CW'
  }

  // get route
  let r = data.postgres.route[0]
  let routeColor = r.routeColor

  // pull trips and longTrips out of the route object
  let { trips, longTrips } = r
  
  // get directions
  let directions = longTrips.map(lt => lt.directionId)
  let [direction, setDirection] = useState(directions[0])
  
  // get services
  let services = Array.from(new Set(trips.map(t => t.service))).sort((a, b) => a > b)
  let now = new Date
  let dow = now.getDay()
  let currentService = services[0];
  if (dow === 6 && services.length > 1) { currentService = services[2]}
  if (dow === 0 && services.length > 2) { currentService = services[1]}
  let [service, setService] = useState(currentService)

  return (
    <Layout>
      <section>
        <RouteTitle short={r.routeShortName} long={r.routeLongName} color={r.routeColor} />
        <h2 className="text-xl mt-2">Timetable</h2>
        <p className="py-1">
        Major stops are shown in order in the top row; look down the column to see scheduled departure times from that bus stop.
        Buses make additional stops between major stops; see a list of all stops on the <a href="./stops" className="text-underline">stops page</a>.
        </p>

      </section>
      <section className="">
        <DirectionPicker inline {...{directions, direction, setDirection, routeOrientation}} className="mr-4 bg-gray-100 px-3 text-sm" />
        <ServicePicker {...{services, service, setService}} />
      </section>
      <section>
        <RouteTimetable {...{trips, longTrips, service, direction, routeColor}} />
        <p className="py-2 text-sm">
          Displaying AM times and <span className="font-semibold">PM times in bold</span>.
        </p>
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
    route: allRoutesList(condition: { routeShortName: $routeNo, feedIndex: 1 }) {
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
            stopName
            stopCode
          }
        }
      }
    }
  }
}`;

export default RouteSchedulePage;