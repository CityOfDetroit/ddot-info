import '@fortawesome/fontawesome-svg-core/styles.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import React from "react";
import Helmet from 'react-helmet';
import PageTitle from "../components/PageTitle";
import RoutesList from '../components/RoutesList';
import SearchBox from '../components/SearchBox';
import '../css/app.css';

const IndexPage = ({ data }) => {

  let { routes, stops } = data.postgres

  return (
    <>
      <Helmet>
        <title>{`DDOT.info`}</title>
        <meta property="og:url" content={`https://ddot.info/`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`DDOT.info`} />
        <meta property="og:description" content={`Route pages, schedules, and real-time information for the city of Detroit's public transit system.`} />
      </Helmet>
      <PageTitle text={'Detroit bus schedules and real-time info'} icon={faHome} />
      <SearchBox routes={routes} stops={stops} />
      <RoutesList routes={routes} title="All routes" />
    </>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: {feedIndex: 1}, orderBy: ROUTE_SORT_ORDER_ASC) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        textColor: routeTextColor
        desc: routeDesc
        type: routeType
        routeId
        routeSortOrder
      }
      stops: allStopsList(condition: { feedIndex: 1 }, orderBy: STOP_NAME_ASC) {
        stopCode
        stopName
      }
    }
  }
`;

export default IndexPage
