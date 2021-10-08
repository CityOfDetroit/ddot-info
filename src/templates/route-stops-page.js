import { faBus } from '@fortawesome/free-solid-svg-icons';
import { graphql } from "gatsby";
import React, { useState } from "react";
import Helmet from 'react-helmet';
import DirectionPicker from '../components/DirectionPicker';
import PageTitle from '../components/PageTitle';
import RouteNumber from '../components/RouteNumber';
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
    <>
      <Helmet>
        <title>{`DDOT.info: Stops for route ${r.routeShortName} ${r.routeLongName}`}</title>
        <meta property="og:url" content={`https://ddot.info/route/${r.routeShortName}/stops`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`Stops for DDOT bus route:${r.routeShortName} ${r.routeLongName}`} />
        <meta property="og:description" content={`Stops for DDOT bus route ${r.routeShortName} ${r.routeLongName}.`} />
      </Helmet>
      <PageTitle icon={faBus} text={<RouteNumber number={r.routeShortName} size='small' color={r.routeColor} />}>
        <h2 className="m-0 font-thin">All stops</h2>
      </PageTitle>
      <DirectionPicker {...{ directions, direction, setDirection, routeOrientation }} />
        <div className="flex px-4">
          
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
        </div>
      <RouteStopsList {...{ longTrips, direction, routeColor }} />
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
    route: allRoutesList(
      condition: { routeShortName: $routeNo, feedIndex: 7 }
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