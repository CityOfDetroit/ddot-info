import React from "react"
import { graphql } from "gatsby";
import RoutesList from '../components/RoutesList'
import PageTitle from "../components/PageTitle";
import { faList } from "@fortawesome/free-solid-svg-icons";

const RoutesPage = ({ data }) => {

  let {routes, stops} = data.postgres

  let sortedRoutes = routes.sort((a, b) => {return parseInt(b.short) < parseInt(a.short)})
  return (
    <>
      <PageTitle text={'All bus routes'} icon={faList} />
      <RoutesList routes={sortedRoutes} scroll={false} />
    </>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: { feedIndex: 1 }) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        routeId
      }
    }
  }
`;

export default RoutesPage
