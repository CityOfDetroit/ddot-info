import React, { useState } from "react";
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SystemMap from '../components/SystemMap';
import RoutesList from "../components/RoutesList";
import RouteNumber from "../components/RouteNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

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

  console.log(routes, pgRoutes)

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

  let [clicked, setClicked] = useState(null)

  let routeTypes = {
    "ConnectTen": {
      color: '004851'
    },
    "Key Routes": {
      color: '0088ce'
    },
    "Neighborhood Routes": {
      color: '5f6369'
    },
    "Part-Time Routes": {
      color: 'FFFFFF'
    },
  }

  return (
    <Layout>
      <SystemMap {...{ routeFeatures, stopsFeatures, clicked }} />
      {clicked && <div>Clicked: {clicked}</div>}
      <div className="py-2" style={{ height: '45vh', overflowY: 'scroll' }}>
        {
          Object.keys(routeTypes).map(rt => {
            let filtered = routes.filter(r => r.color === routeTypes[rt].color)
            return (
              <>
                <h1 className="bg-gray-200 p-2">{rt}</h1>
                <div className="px-2 my-2">
                {filtered.map((f, i) => (
                  <div className={i + 1 === filtered.length ? "flex items-center py-1" : "flex items-center py-1 border-b-2"}>
                    <RouteNumber number={f.short} color={f.color} size="small" />
                    <span className="gibson-bold">{f.long}</span>
                    <FontAwesomeIcon icon={faArrowCircleRight} onClick={() => setClicked(f.short)}/>
                  </div>
                ))}
                </div>
              </>
            )
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