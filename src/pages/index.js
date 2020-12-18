import React from "react"
import { graphql, Link } from "gatsby";

import Layout from "../components/layout"
import RoutesList from '../components/RoutesList'
import SystemMap from '../components/SystemMap'

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

  let {routes} = data.postgres

  let features = data.allDdotRoute.edges.map(e => {
    let match = routes.filter(f => f.short === e.node.short)[0]
    return nodeToFeature(e.node, match)
  })

  let routeFeatures = { type: "FeatureCollection", features: features }

  return (
    <Layout gridClass="index-grid">
      <h1 className="text-lg font-semibold">Welcome to ddot.info</h1>
      <section className="mb-3">
        <h2>Choose your route</h2>
        <p className="gibson mb-2">Click on a route number or name for an overview. Click an icon to go directly to that route's bus stops or schedule.</p>
        <RoutesList routes={routes} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: { feedIndex: 1 }, orderBy: ROUTE_SORT_ORDER_ASC) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        desc: routeDesc
        routeId
      }
      stops: allStopsList(condition: { feedIndex: 1 }) {
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
