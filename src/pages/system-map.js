import React from "react";
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SystemMap from '../components/SystemMap';

const nodeToFeature = (node, matching) => {
  let { route, ...props } = node
  props.color = '#' + matching.routeColor;
  return {
    "type": "Feature",
    "geometry": route.geometry,
    "properties": props
  }
}

export default ({ data }) => {

  let pgRoutes = data.pg.allRoutes.edges.map(e => e.node)

  let features = data.allDdotRoute.edges.map(e => {

    let match = pgRoutes.filter(f => f.routeShortName === e.node.short)[0]
    return nodeToFeature(e.node, match)
  })

  let routeFeatures = { type: "FeatureCollection", features: features }

  return (
    <Layout>
      <SystemMap {...{ routeFeatures }} />
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
  }
}`