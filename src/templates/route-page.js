import {
  faArrowCircleRight,
  faBus,
  faCalendar,
  faFilePdf,
  faMap,
  faRss,
} from "@fortawesome/free-solid-svg-icons"
import { graphql, Link } from "gatsby"
import React, { useEffect, useMemo, useState } from "react"
import Helmet from "react-helmet"
import DirectionPicker from "../components/DirectionPicker"
import PageTitle from "../components/PageTitle"
import RouteMap from "../components/RouteMap"
import { RouteStopsList } from "../components/RouteStopsList"
import RouteTitle from "../components/RouteTitle"
import SiteButton from "../components/SiteButton"
import SiteSection from "../components/SiteSection"
import { Vehicle } from "../components/Vehicle"
import ServiceSuspended from "../components/ServiceSuspended"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// GTFS-rt omits bearing on stationary buses (~38% of the fleet at any moment, but
// only 3% of moving ones). BusTime always sent a heading, so a stopped bus kept
// facing its last direction; without this the map snaps them all north. Reuse the
// last bearing we saw for each vehicle.
function carryBearing(features, prev) {
  if (!prev) return features
  let lastBearing = new Map(
    prev
      .filter(p => p.properties.bearing !== null)
      .map(p => [p.properties.vid, p.properties.bearing])
  )
  return features.map(f => {
    if (f.properties.bearing !== null) return f
    let carried = lastBearing.get(f.properties.vid)
    if (carried === undefined) return f
    return { ...f, properties: { ...f.properties, bearing: carried } }
  })
}

const RoutePage = ({ data, pageContext }) => {
  let r = data.postgres.route[0]
  let { trips, longTrips, routeColor } = r

  // stop_id -> name, for naming the stop a bus reports. GTFS-rt gives us the stop
  // directly, so this replaces walking BusTime's pattern geometry by distance.
  let stopNames = useMemo(
    () => Object.fromEntries((r.stopsList || []).map(s => [s.stopId, s.stopName])),
    [r.stopsList]
  )
  let info = data.allDdotRoute.edges.map(e => e.node)
  let ddotRt = info[0]

  // directionId (0/1) -> compass label ("Eastbound"). GTFS-rt gives buses only the
  // opaque directionId; DDOT's route shapes carry the compass direction keyed to the
  // same id (verified to align with GTFS direction_id), so this recovers the heading
  // BusTime used to send as rtdir.
  let directionsById = useMemo(
    () =>
      Object.fromEntries(
        info.filter(n => n.directionId != null).map(n => [n.directionId, n.direction])
      ),
    [info]
  )

  let geojson = info.map(i => {
    let { route, ...properties } = i
    properties.color = "#" + r.routeColor
    return { ...route, properties: properties }
  })

  let routeOrientation = "NS"
  if (info.length > 0) {
    if (
      info[0].direction === "Northbound" ||
      info[0].direction === "Southbound"
    ) {
      routeOrientation = "NS"
    }
    if (
      info[0].direction === "Eastbound" ||
      info[0].direction === "Westbound"
    ) {
      routeOrientation = "EW"
    }
    if (info[0].direction === "Loop") {
      routeOrientation = "CW"
    }
  }

  // get directions
  let directions = longTrips.map(lt => lt.directionId)
  let [direction, setDirection] = useState(
    directions.length > 0 ? directions[0] : null
  )

  // set up a 15s 'tick' using `now`; pause while the tab is hidden and
  // refresh immediately when it becomes visible again
  let [now, setNow] = useState(new Date())
  useEffect(() => {
    let tick = setInterval(() => {
      if (!document.hidden) {
        setNow(new Date())
      }
    }, 15000)
    let onVisible = () => {
      if (!document.hidden) {
        setNow(new Date())
      }
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      clearInterval(tick)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [])

  // fetch vehicle data into this state object; null = loading, [] = none tracked
  //
  // feed-vehicles is the whole fleet (~4 KB gzipped) on a parameterless URL, so it
  // stays a single CDN cache entry and Swiftly sees one call per 15s for the entire
  // site. We filter to this route here rather than asking the server to.
  let [vehicles, setVehicles] = useState(null)
  useEffect(() => {
    let cancelled = false
    fetch(`/.netlify/functions/feed-vehicles`)
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
      .then(d => {
        if (cancelled) return
        // routeId is the GTFS route_id, identical to route_short_name in this feed.
        let onRoute = d.features.filter(
          f => f.properties.routeId === r.routeShortName
        )
        setVehicles(prev => carryBearing(onRoute, prev))
      })
      .catch(() => {
        if (!cancelled) setVehicles([])
      })
    return () => {
      cancelled = true
    }
  }, [r.routeShortName, now])

  let [tracked, setTracked] = useState(null)

  return (
    <div>
      <Helmet>
        <title>{`DDOT.info: Route ${r.routeShortName} ${r.routeLongName}`}</title>
        <meta
          property="og:url"
          content={`https://ddot.info/route/${r.routeShortName}/`}
        />
        <meta property="og:type" content={`website`} />
        <meta
          property="og:title"
          content={`DDOT bus route: ${r.routeShortName} ${r.routeLongName}`}
        />
        <meta
          property="og:description"
          content={`DDOT bus route ${r.routeShortName} ${r.routeLongName}: ${ddotRt.description}`}
        />
      </Helmet>
      <PageTitle>
        <RouteTitle long={r.routeLongName} short={r.routeShortName} color={r.routeColor} size="small" />
        <span className="text-sm font-thin text-gray-800 py-1">{ddotRt.RouteType} route</span>
      </PageTitle>
      <SiteSection>
        <p className="text-sm text-left leading-tight">{ddotRt.description}</p>
        <p className="text-sm text-left leading-tight">
          <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
          <Link
            to={`https://detroitmi.gov/document/${
              r.routeShortName
            }-${r.routeLongName
              .replace("/", "")
              .replace("-", "")
              .replace(" ", "-")
              .replace("MidCity", "Mid-City")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download schedule PDF
          </Link>
        </p>
      </SiteSection>
      {trips.length === 0 && <ServiceSuspended at="route" />}
      <SiteSection
        title={`Map`}
        subtitle={
          !tracked && vehicles
            ? "Tap the bus icon to show more information"
            : null
        }
        icon={faMap}
        fullWidth
        expands
      >
        <RouteMap
          routes={geojson}
          stops={r.stopsList}
          timepoints={r.timepointsList}
          vehicles={vehicles}
          {...{ tracked, setTracked }}
        />
      </SiteSection>
      <SiteSection
        title="Real-time bus locations"
        subtitle={
          vehicles && vehicles.length > 0
            ? `Tap ${tracked ? `the` : `a`} bus to ${
                tracked ? `stop` : `start`
              } following the bus location`
            : null
        }
        icon={faRss}
        fullWidth
        expands
        startsClosed
        isOpen={tracked}
      >
        {vehicles === null ? (
          <p className="text-sm text-gray-700 px-4 py-2">
            Looking for buses on this route…
          </p>
        ) : vehicles.length === 0 ? (
          <p className="text-sm text-gray-700 px-4 py-2">
            No buses are being tracked on this route right now.
          </p>
        ) : tracked ? (
          vehicles
            .filter(v => v.properties.vid === tracked)
            .map(v => (
              <Vehicle
                vehicle={v}
                key={v.properties.vid}
                {...{ longTrips, stopNames, directionsById, tracked, setTracked }}
              />
            ))
        ) : (
          vehicles.map(v => (
            <Vehicle
              vehicle={v}
              key={v.properties.vid}
              {...{ longTrips, stopNames, tracked, setTracked }}
            />
          ))
        )}
      </SiteSection>
      {trips.length > 0 && (
        <SiteSection icon={faCalendar} title={`Service frequency`} subtitle={`How often the bus comes`} expands fullWidth>
          <table className="schedule-table">
            <tbody>
              <tr className="bg-gray-200">
                <th className="text-left font-thin">Weekday</th>
                <th aria-label="Weekday frequency"></th>
              </tr>
              <tr>
                <td>Peak-hour</td>
                <td>every {ddotRt.frqWkPeak} minutes</td>
              </tr>
              {ddotRt.frqWkBase > 0 && (
                <tr>
                  <td>Daytime</td>
                  <td>every {ddotRt.frqWkBase} minutes</td>
                </tr>
              )}
              {ddotRt.frqWkNight > 0 && (
                <tr>
                  <td>Nighttime</td>
                  <td>every {ddotRt.frqWkNight} minutes</td>
                </tr>
              )}
              {ddotRt.days !== "Mon-Fri" && (
                <>
                  <tr className="bg-gray-200">
                    <th className="font-thin">Saturday</th>
                    <th aria-label="Saturday frequency"></th>
                  </tr>
                  {ddotRt.frqSaBase > 0 && (
                    <tr>
                      <td>Daytime</td>
                      <td>every {ddotRt.frqSaBase} minutes</td>
                    </tr>
                  )}
                  {ddotRt.frqSaNight > 0 && (
                    <tr>
                      <td className="px-2 py-1">Nighttime</td>
                      <td>every {ddotRt.frqSaNight} minutes</td>
                    </tr>
                  )}
                </>
              )}
              {ddotRt.days !== "Mon-Fri" && ddotRt.days !== "Mon-Sat" && (
                <>
                  <tr className="bg-gray-200">
                    <th className="font-thin">Sunday</th>
                    <th aria-label="Sunday frequency"></th>
                  </tr>
                  {ddotRt.frqSuBase > 0 && (
                    <tr>
                      <td>Daytime</td>
                      <td>every {ddotRt.frqSuBase} minutes</td>
                    </tr>
                  )}
                  {ddotRt.frqSuNight > 0 && (
                    <tr>
                      <td>Nighttime</td>
                      <td>every {ddotRt.frqSuNight} minutes</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
          <SiteButton
            link="./schedule"
            ariaLabel="View full timetable"
            text="View full timetable"
            icon={faArrowCircleRight}
          />
        </SiteSection>
      )}

      {trips.length > 0 && (
        <SiteSection
          icon={faBus}
          title={`Major stops`}
          expands
          startsClosed
          fullWidth
        >
          <DirectionPicker
            {...{ directions, direction, setDirection, routeOrientation }}
            className="bg-gray-200 text-gray-700 px-2 text-xs mb-1"
          />
          <RouteStopsList
            {...{ longTrips, direction, routeColor }}
            timepointsOnly
            small
          />
          <SiteButton
            link="./stops"
            ariaLabel="Stops"
            text="View all stops"
            icon={faArrowCircleRight}
          />
        </SiteSection>
      )}
    </div>
  )
}

export const query = graphql`
  query($routeNo: String!) {
    allDdotRoute(filter: { short: { eq: $routeNo } }) {
      edges {
        node {
          id
          orientation
          direction
          directionId
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
        condition: { routeShortName: $routeNo, feedIndex: 1 }
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
          stopTimes: stopTimesByFeedIndexAndTripIdList(
            orderBy: STOP_SEQUENCE_ASC
          ) {
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
          theGeom {
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
          stopTimes: stopTimesByFeedIndexAndTripIdList(
            condition: { timepoint: 1 }
          ) {
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
`

export default RoutePage
