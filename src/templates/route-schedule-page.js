import { faClock } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import React, { useState } from "react";
import Helmet from 'react-helmet';
import DirectionPicker from '../components/DirectionPicker';
import PageTitle from "../components/PageTitle";
import RouteNumber from "../components/RouteNumber";
import RouteTimetable from "../components/RouteTimetable";
import ServicePicker from "../components/ServicePicker";
import ServiceSuspended from '../components/ServiceSuspended';
import SiteSection from "../components/SiteSection";

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
  let now = new Date()
  let dow = now.getDay()
  let currentService = "3";
  if (dow === 0 && services.length > 1) { currentService = "1" }
  if (dow === 6 && services.length > 1) { currentService = "2" }

  let [service, setService] = useState(currentService)

  let serviceDesc = `Service is provided`
  if (services.length === 1) {
    serviceDesc = serviceDesc + ` on weekdays only.`
  }
  if (services.length === 2) {
    serviceDesc = serviceDesc + ` on weekdays and Saturdays.`
  }
  if (services.length === 3) {
    serviceDesc = serviceDesc + ` on weekdays, Saturdays, and Sundays..`
  }

  let routeDesc;
  if (longTrips.length > 0) {
    routeDesc = `between ${longTrips[0].stopTimes[0].stop.stopName} and ${longTrips[0].stopTimes.slice(-1)[0].stop.stopName}`
  }

  return (
    <>
      <Helmet>
        <title>{`DDOT.info: Schedule for route ${r.routeShortName} ${r.routeLongName}`}</title>
        <meta property="og:url" content={`https://ddot.info/route/${r.routeShortName}/schedule`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`${r.routeShortName} ${r.routeLongName} schedule`} />
        <meta property="og:description" content={`Schedule for DDOT bus route ${r.routeShortName} ${r.routeLongName}. Service is provided on ${serviceDesc}, ${routeDesc}.`} />
      </Helmet>
      <PageTitle icon={faClock} text={<RouteNumber number={r.routeShortName} size='small' color={r.routeColor} />}>
        <h2 className="m-0 font-thin">Schedule</h2>
      </PageTitle>

      {longTrips.length === 0 && <ServiceSuspended at='route'/>}

      {longTrips.length > 0 && <><SiteSection>
        <p>
          Major stops are shown in order in the top row; look down the column to see scheduled departure times from that bus stop.
          Buses make additional stops between major stops; see a list of all stops on the <a href="../stops" className="text-underline">stops page</a>.
        </p>
        <p className="text-sm">
          AM times are shown normally; <span className="font-semibold">PM times are in bold</span>.
        </p>
      </SiteSection>

     <section className="">
        <ServicePicker {...{services, service, setService}} />
        <DirectionPicker inline {...{directions, direction, setDirection, routeOrientation}} className="mr-4 bg-gray-100 px-3 text-sm" />
      </section>

      <section>
        <RouteTimetable {...{trips, longTrips, service, direction, routeColor}} />
      </section></>}

    </>
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
    route: allRoutesList(condition: { routeShortName: $routeNo, feedIndex: 44 }) {
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