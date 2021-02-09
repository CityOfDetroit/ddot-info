import React from "react"
import { graphql } from "gatsby";

import Layout from "../components/layout"
import RoutesList from '../components/RoutesList'

const RoutesPage = ({ data }) => {

  let {routes, stops} = data.postgres

  let sortedRoutes = routes.sort((a, b) => {return parseInt(b.short) < parseInt(a.short)})
  return (
    <Layout>
      <RoutesList routes={sortedRoutes} />
    </Layout>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: { feedIndex: 5 }) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        routeId
      }
    }
  }
`;

export default RoutesPage
