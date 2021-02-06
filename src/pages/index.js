import React from "react"
import { graphql, Link } from "gatsby";

import Layout from "../components/layout"
import RoutesList from '../components/RoutesList'
import SystemMap from '../components/SystemMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faClock, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const nodeToFeature = (node, matching) => {
  let { route, ...props } = node
  props.color = '#' + matching.color;
  return {
    "type": "Feature",
    "geometry": route.geometry,
    "properties": props
  }
}

const IndexPage = ({ data }) => {

  let { routes } = data.postgres

  let features = data.allDdotRoute.edges.map(e => {
    let match = routes.filter(f => f.short === e.node.short)[0]
    return nodeToFeature(e.node, match)
  })

  let routeFeatures = { type: "FeatureCollection", features: features }

  return (
    <Layout gridClass="index-grid">
      <h1 className="text-2xl">Welcome to ddot.info</h1>
      <p className="py-1">You can find a description, map, and real-time information for your bus route by clicking the name of the route.</p>
      <p className="py-1">Click the bus icon <FontAwesomeIcon icon={faBus} className="mx-1" /> for a listing of bus stops, or the schedule <FontAwesomeIcon icon={faClock} className="mx-1" /> icon for a timetable at major stops.</p>
      <section className="mb-3 mt-4">
        <h2 className="text-xl mb-3">Choose your route</h2>
        <RoutesList routes={routes} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: { feedIndex: 4 }, orderBy: ROUTE_SORT_ORDER_ASC) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        desc: routeDesc
        routeId
      }
      stops: allStopsList(condition: { feedIndex: 4 }) {
        stopId
        stopName
      }
    }
    allDdotRoute {
      edges {
        node {
          id
          days
          description
          direction
          orientation
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
  }
`;

export default IndexPage
