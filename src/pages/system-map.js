import { faBaby, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, Link } from 'gatsby';
import React, { useState } from "react";
import Layout from '../components/layout';
import SystemMap from '../components/SystemMap';
import SystemMapRouteType from '../components/SystemMapRouteType';
import routeTypes from '../data/routeTypes';

const nodeToFeature = (node, matching) => {
  let { route, ...props } = node
  props.color = '#' + matching.routeColor;
  return {
    "type": "Feature",
    "geometry": route.geometry,
    "properties": props
  }
}

const SystemMapPage = ({ data }) => {

  let pgRoutes = data.pg.allRoutes.edges.map(e => e.node)

  let { routes } = data.pg

  let stops = data.pg.allStops

  let features = data.allDdotRoute.edges.map(e => {
    let match = pgRoutes.filter(f => f.routeShortName === e.node.short)[0]
    return nodeToFeature(e.node, match)
  })

  let routeFeatures = { type: "FeatureCollection", features: features }

  let stopsFeatures = stops.map(t => {
    let { theGeom, ...props } = t
    return {
      "type": "Feature",
      "geometry": theGeom['geojson'],
      "properties": props
    }
  })

  // get a default object marking all routes as true
  let defaultClicked = routes.reduce((total, item) => ({
    ...total,
    [item.short]: item.short < 11 ? true : false
  }), {})
  let [clicked, setClicked] = useState(defaultClicked)

  return (
    <Layout>
      <SystemMap {...{ routeFeatures, stopsFeatures, clicked }} />
      <div className="" style={{ height: 'auto', overflowY: 'scroll' }}>
        {
          Object.keys(routeTypes).map(rt => {
            let filtered = routes.filter(r => r.color === routeTypes[rt].color)
            return <SystemMapRouteType {...{clicked, setClicked, routeType: rt, filtered: filtered, startsOpen: rt === 'ConnectTen'}} />
          })
        }
      </div>
    </Layout>

  );
};

export const query = graphql`
query MyQuery {
  allDdotRoute {
    edges {
      node {
        id
        days
        description
        direction
        orientation
        localService
        RouteType: routeType
        route {
          geometry {
            coordinates
            type
          }
          type
        }
        short
      }
    }
  }
  pg: postgres {
    allRoutes(condition: {feedIndex: 1}) {
      edges {
        node {
          routeColor
          routeDesc
          routeShortName
        }
      }
    }
    allStops: allStopsList(condition: {feedIndex: 1}) {
      stopName
      stopCode
      theGeom {
				geojson
      }
    }
    routes: allRoutesList(condition: { feedIndex: 1 }, orderBy: ROUTE_SORT_ORDER_ASC) {
      short: routeShortName
      long: routeLongName
      color: routeColor
      desc: routeDesc
      routeId
    }
  }
}`

export default SystemMapPage;