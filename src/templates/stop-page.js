import { faBusAlt, faClock, faMap, faRss } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import React, { useEffect, useMemo, useState } from "react";
import Helmet from 'react-helmet';
import { NearbyStops } from "../components/NearbyStops";
import { NextArrivals } from "../components/NextArrivals";
import { cleanHeadsign } from "../components/cleanHeadsign";
import PageTitle from '../components/PageTitle';
import { RoutesHere } from "../components/RoutesHere";
import ServiceSuspended from "../components/ServiceSuspended";
import SiteSection from "../components/SiteSection";
import StopMap from "../components/StopMap";
import { TimesHere } from "../components/TimesHere";

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

  // trip_id -> { headsign, direction } for every trip scheduled through this stop.
  // Swiftly's realtime tripIds are GTFS trip_ids (verified: 425/425 matched), so
  // arrivals can be named from build-time data with no runtime lookup.
  //   headsign  — what's on the front of the bus (replaces nothing; GTFS gives it)
  //   direction — compass heading ("Eastbound"), recovered from route+directionId via
  //               the DdotRoute shapes; this is what BusTime sent as rtdir.
  const tripInfo = useMemo(() => {
    const dirLabel = {} // `${short}|${directionId}` -> "Eastbound"
    allRoutes.forEach(r => {
      dirLabel[`${r.short}|${r.directionId}`] = r.direction
    })
    return Object.fromEntries(
      times.map(t => [
        t.trip.tripId,
        {
          headsign: cleanHeadsign(t.trip.tripHeadsign),
          direction: dirLabel[`${t.trip.route.routeShortName}|${t.trip.directionId}`],
        },
      ])
    )
  }, [times, allRoutes])

  // null = loading, false = none available, object = predictions
  const [predictions, setPredictions] = useState(null)

  // null = show all routes at this stop
  const [currentRoute, setCurrentRoute] = useState(null)

  const [currentTrip, setCurrentTrip] = useState(null)

  // set up a 15s 'tick' using `now`; pause while the tab is hidden and
  // refresh immediately when it becomes visible again
  let [now, setNow] = useState(new Date());
  useEffect(() => {
    let tick = setInterval(() => {
      if (!document.hidden) {
        setNow(new Date());
      }
    }, 15000);
    let onVisible = () => {
      if (!document.hidden) {
        setNow(new Date());
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // NOTE: stopId, not stopCode. They are disjoint ID spaces in this feed — the URL
  // and title show stop_code (#2129) while Swiftly keys on stop_id (1431). Passing
  // the wrong one returns another stop's buses silently instead of erroring.
  useEffect(() => {
    let cancelled = false
    fetch(`/.netlify/functions/stop?stopId=${s.stopId}`)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then(d => {
        if (cancelled) return
        setPredictions(d.arrivals && d.arrivals.length > 0 ? d : false)
      })
      .catch(() => {
        if (!cancelled) setPredictions(false)
      })
    return () => {
      cancelled = true
    }
  }, [s.stopId, now])

  useEffect(() => {
    if (currentTrip) {
      setCurrentRoute(currentTrip.routeId)
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
        <span className="text-base font-thin text-gray-700 bg-white py-0 px-2 m-0">#{s.stopCode}</span>
      </PageTitle>
      {times.length === 0 && <ServiceSuspended at='stop' />}
      {predictions ?
        <NextArrivals {...{ routeFeatures, predictions, tripInfo, currentTrip, setCurrentTrip }} /> :
        <SiteSection icon={faRss} title="Next buses at this stop" fullWidth expands>
          <p className="text-sm text-gray-700 px-4 py-2">
            {predictions === null ?
              `Checking for buses headed to this stop…` :
              `No live arrival predictions for this stop right now.`}
          </p>
        </SiteSection>}
      <SiteSection fullWidth title='Scheduled departures' icon={faClock} expands className="mb-0">
        <RoutesHere {...{ routes, currentRoute, setCurrentRoute }} />
        <TimesHere {...{ times, currentRoute, routes }} />
        {/* <StopTransfers /> */}
      </SiteSection>
      <SiteSection icon={faMap} title={`Stop map`} fullWidth expands>
        <StopMap {...{ stopLon, stopLat, stopName, routeFeatures, currentRoute, currentTrip, predictions }} />
      </SiteSection>
      <NearbyStops nearby={s.nearby} stopLat={stopLat} stopLon={stopLon} />
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
          stopCode
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