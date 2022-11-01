import React from "react"
import { graphql } from "gatsby";
import RoutesList from '../components/RoutesList'
import PageTitle from "../components/PageTitle";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Helmet from 'react-helmet';

const RoutesPage = ({ data }) => {

  let {routes} = data.postgres

  let sortedRoutes = routes.sort((a, b) => {return parseInt(b.short) < parseInt(a.short)})
  return (
    <>
      <Helmet>
        <title>{`DDOT.info: List of routes`}</title>
        <meta property="og:url" content={`https://ddot.info/routes/`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`DDOT bus routes`} />
        <meta property="og:description" content={`List of all DDOT bus routes, with links to their main page, along with stops and schedules.`} />
      </Helmet>
      <PageTitle text={'List of routes'} icon={faList} />
      <RoutesList routes={sortedRoutes} title={null} scroll={false} />
    </>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: {feedIndex: 19}, orderBy: ROUTE_SORT_ORDER_ASC) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        routeId
        type: routeType
      }
    }
  }
`;

export default RoutesPage
