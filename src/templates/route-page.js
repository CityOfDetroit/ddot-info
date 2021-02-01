import React, { useEffect, useState } from 'react';

import { graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faBus, faCalendar, faMap, faRoute, faRss } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout'
import DirectionPicker from '../components/DirectionPicker'
import RouteMap from '../components/RouteMap';
import { RouteTitle } from '../components/RouteSign';
import { RouteStopsList } from '../components/RouteStopsList';
import SectionHeader from '../components/SectionHeader';
import SectionContainer from '../components/SectionContainer';
import { Vehicle } from '../components/Vehicle';

const RoutePage = ({ data, pageContext }) => {

  let r = data.postgres.route[0];
  let { trips, longTrips, routeColor, routeType } = r;
  let info = data.allDdotRoute.edges.map(e => e.node)
  let ddotRt = info[0]
  let geojson = info.map(i => {
    let { route, ...properties } = i
    properties.color = '#' + r.routeColor
    return { ...route, properties: properties }
  })

  let routeOrientation;

  if (info[0].direction === 'Northbound' || info[0].direction === 'Southbound') {
    routeOrientation = 'NS'
  }
  if (info[0].direction === 'Eastbound' || info[0].direction === 'Westbound') {
    routeOrientation = 'EW'
  }
  if (info[0].direction === 'Loop') {
    routeOrientation = 'CW'
  }

  // get directions
  let directions = longTrips.map(lt => lt.directionId)
  let [direction, setDirection] = useState(directions[0])

  // set up a 15s 'tick' using `now`
  let [now, setNow] = useState(new Date());
  useEffect(() => {
    let tick = setInterval(() => {
      setNow(new Date());
    }, 20000);
    return () => clearInterval(tick);
  }, []);

  // fetch pattern data for the route
  let [patterns, setPatterns] = useState(null)
  useEffect(() => {
    fetch(`/.netlify/functions/pattern?rt=${r.routeShortName}`)
      .then(r => r.json())
      .then(d => {
        setPatterns(d['bustime-response'].ptr)
      })
  }, [])

  // fetch vehicle data into this state object
  let [vehicles, setVehicles] = useState(null)
  useEffect(() => {
    fetch(`/.netlify/functions/route?rt=${r.routeShortName}`)
      .then(r => r.json())
      .then(d => {
        if (d['bustime-response']['error']) {
          setVehicles(null)
          return;
        }

        let vehs = d['bustime-response']['vehicle']

        let vehicleFeatures = vehs.map(v => {
          let { lon, lat, ...extra } = v
          return {
            "type": "Feature",
            properties: extra,
            geometry: {
              type: "Point",
              coordinates: [parseFloat(lon), parseFloat(lat)]
            }
          }
        })
        setVehicles(vehicleFeatures)
      })
  }, [r.routeShortName, now])

  let [tracked, setTracked] = useState(null)

  return (
    <Layout gridClass={"route-grid"}>
      <div>
        <header>
          <div className="flex justify-between items-center">
            <RouteTitle long={r.routeLongName} short={r.routeShortName} color={r.routeColor} />
            <p className="text-sm text-gray-600 mr-2">{ddotRt.routeType}</p>
          </div>
          <p className="text-sm py-2">{r.routeDesc}</p>
        </header>
        <SectionContainer>
          <SectionHeader icon={faMap} title={`Map`} />
          <RouteMap routes={geojson} stops={r.stopsList} timepoints={r.timepointsList} vehicles={vehicles} {...{ tracked, setTracked }} />
        </SectionContainer>
        {vehicles && patterns && <SectionContainer className="section-scroll" header={<SectionHeader icon={faRss} title={"Real-time bus locations"} />} scroll>
          {vehicles.map(v => <Vehicle vehicle={v} key={v.properties.vid} {...{ patterns, tracked, setTracked }} />)}
        </SectionContainer>}
      </div>
      <section className="">
        <SectionContainer>
          <SectionHeader icon={faCalendar} title={`Schedule`} />
          <table className="schedule-table">
            <tbody>
            <tr className="bg-gray-200">
              <th className="text-left">Weekday</th>
              <th></th>
            </tr>
            <tr>
              <td>Peak-hour</td>
              <td>every {ddotRt.frqWkPeak} minutes</td>
            </tr>
            {ddotRt.frqWkBase > 0 && <tr>
              <td>Daytime</td>
              <td>every {ddotRt.frqWkBase} minutes</td>
            </tr>}
            {ddotRt.frqWkNight > 0 && <tr>
              <td>Nighttime</td>
              <td>every {ddotRt.frqWkNight} minutes</td>
            </tr>}
            {ddotRt.days !== "Mon-Fri" &&
            <>
            <tr className="bg-gray-200">
              <th>Saturday</th>
              <th></th>
            </tr>
            {ddotRt.frqSaBase > 0 && <tr>
              <td>Daytime</td>
              <td>every {ddotRt.frqSaBase} minutes</td>
            </tr>}
            {ddotRt.frqSaNight > 0 && <tr>
              <td className="px-2 py-1">Nighttime</td>
              <td>every {ddotRt.frqSaNight} minutes</td>
            </tr>}
            </>}
            {ddotRt.days !== 'Mon-Fri' && ddotRt.days !== 'Mon-Sat' && <><tr className="bg-gray-200">
              <th>Sunday</th>
              <th></th>
            </tr>
            {ddotRt.frqSuBase > 0 && <tr>
              <td>Daytime</td>
              <td>every {ddotRt.frqSuBase} minutes</td>
            </tr>}
            {ddotRt.frqSuNight > 0 && <tr>
              <td>Nighttime</td>
              <td>every {ddotRt.frqSuNight} minutes</td>
            </tr>}</>}</tbody>
          </table>
          <div className="text-md text-gray-700 gibson-bold p-2 flex items-center">
            <Link to="./schedule" >
              <span>View full schedule</span>
              <FontAwesomeIcon icon={faArrowCircleRight} className="ml-1" />
            </Link>
          </div>
        </SectionContainer>
        <SectionContainer>
          <SectionHeader icon={faBus} title={`Major stops`} />
          <DirectionPicker {...{ directions, direction, setDirection, routeOrientation }} className="bg-gray-200 text-gray-700 px-2 text-xs mb-1" />
          <RouteStopsList {...{ longTrips, direction, routeColor }} timepointsOnly small />
          <div className="text-md text-gray-700 gibson-bold p-2 flex items-center">
            <Link to="./stops" >
              <span>View all stops</span>
              <FontAwesomeIcon icon={faArrowCircleRight} className="ml-1" />
            </Link>
          </div>
        </SectionContainer>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($routeNo: String!) {
    allDdotRoute(filter: {short: {eq: $routeNo}}) {
      edges {
        node {
          id
          orientation
          direction
          description
          days
          short
          frqWkBase
          frqWkNight
          frqWkPeak
          frqSaBase
          frqSaNight
          frqSuBase
          frqSuNight
          localService
          RouteType: routeType
          route {
            type
            geometry {
              type
              coordinates
            }
          }
        }
      }
    }
    postgres {
      route: allRoutesList(
        condition: { routeShortName: $routeNo, feedIndex: 4 }
      ) {
        agencyId
        routeShortName
        routeLongName
        routeId
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
        timepointsList {
          theGeom {
            geojson
          }
          stopName
          stopDesc
          stopId
          stopCode
        }
        stopsList {
          theGeom{
            geojson
          }
          stopName
          stopDesc
          stopId
          stopCode
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

export default RoutePage;