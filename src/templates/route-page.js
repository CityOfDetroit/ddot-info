import { faArrowCircleRight, faBus, faCalendar, faMap, faRss } from '@fortawesome/free-solid-svg-icons';
import { graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import DirectionPicker from '../components/DirectionPicker';
import PageTitle from '../components/PageTitle';
import RouteMap from '../components/RouteMap';
import { RouteStopsList } from '../components/RouteStopsList';
import RouteTitle from '../components/RouteTitle';
import SiteButton from '../components/SiteButton';
import SiteSection from '../components/SiteSection';
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
    <div>
      <Helmet>
        <title>{`DDOT.info: Route ${r.routeShortName} ${r.routeLongName}`}</title>
        <meta property="og:url" content={`https://ddot.info/route/${r.routeShortName}/`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`DDOT bus route: ${r.routeShortName} ${r.routeLongName}`} />
        <meta property="og:description" content={`DDOT bus route ${r.routeShortName} ${r.routeLongName}: ${ddotRt.description}`} />
      </Helmet>
      <PageTitle>
        <RouteTitle long={r.routeLongName} short={r.routeShortName} color={r.routeColor} size="small" />
        <span className="text-sm font-thin text-gray-800 py-1">{ddotRt.RouteType} route</span>
      </PageTitle>
      <SiteSection>
        <p className="text-sm text-left leading-tight">{ddotRt.description}</p>
      </SiteSection>
      <SiteSection title={`Map`} subtitle={!tracked && vehicles ? "Tap the bus icon to show more information" : null} icon={faMap} fullWidth expands>
        <RouteMap routes={geojson} stops={r.stopsList} timepoints={r.timepointsList} vehicles={vehicles} {...{ tracked, setTracked }} />
      </SiteSection>
      {vehicles && patterns && <SiteSection title="Real-time bus locations" subtitle={`Tap ${tracked ? `the` : `a`} bus to ${tracked ? `stop` : `start`} following the bus location`} icon={faRss} fullWidth expands startsClosed isOpen={tracked}>
        {
          tracked ?
          vehicles.filter(v => v.properties.vid === tracked).map(v => <Vehicle vehicle={v} key={v.properties.vid} {...{ patterns, tracked, setTracked }} />)
          : vehicles.map(v => <Vehicle vehicle={v} key={v.properties.vid} {...{ patterns, tracked, setTracked }} />)
        }
      </SiteSection>}
      <SiteSection icon={faCalendar} title={`Schedule`} expands fullWidth>
        <table className="schedule-table">
          <tbody>
            <tr className="bg-gray-200">
              <th className="text-left font-thin">Weekday</th>
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
                  <th className="font-thin">Saturday</th>
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
              <th className="font-thin">Sunday</th>
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
        <SiteButton link='./schedule' ariaLabel='Schedule' text='Schedule' icon={faArrowCircleRight} />
      </SiteSection>

      <SiteSection icon={faBus} title={`Major stops`} expands startsClosed fullWidth>
        <DirectionPicker {...{ directions, direction, setDirection, routeOrientation }} className="bg-gray-200 text-gray-700 px-2 text-xs mb-1" />
        <RouteStopsList {...{ longTrips, direction, routeColor }} timepointsOnly small />
        <SiteButton link='./stops' ariaLabel='Stops' text='View all stops' icon={faArrowCircleRight} />
      </SiteSection>
    </div>
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
        condition: { routeShortName: $routeNo, feedIndex: 7 }
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