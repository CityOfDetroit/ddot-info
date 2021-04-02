import React from "react"
import { graphql } from "gatsby";
import RoutesList from '../components/RoutesList'
import PageTitle from "../components/PageTitle";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Helmet from 'react-helmet';
import logo from '../images/ddot-logo.png';

const RoutesPage = ({ data }) => {

  let {routes} = data.postgres

  let sortedRoutes = routes.sort((a, b) => {return parseInt(b.short) < parseInt(a.short)})
  return (
    <>
      <Helmet>
        <title>{`DDOT.info: All bus routes`}</title>
        <meta property="og:url" content={`https://ddot.info/routes/`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`DDOT bus routes`} />
        <meta property="og:description" content={`List of all DDOT bus routes, with links to their main page, along with stops and schedules.`} />
        <meta property="og:image" content={logo} />
      </Helmet>
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
