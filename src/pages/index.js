import '@fortawesome/fontawesome-svg-core/styles.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import React from "react";
import Helmet from 'react-helmet';
import PageTitle from "../components/PageTitle";
import RoutesList from '../components/RoutesList';
import SiteSection from "../components/SiteSection";
import '../css/app.css';

const IndexPage = ({ data }) => {

  let { routes, feed } = data.postgres

  console.log(routes)

  return (
    <>
      <Helmet>
        <title>{`DDOT.info`}</title>
        <meta property="og:url" content={`https://ddot.info/`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`DDOT.info`} />
        <meta property="og:description" content={`Route pages, schedules, and real-time information for the city of Detroit's public transit system.`} />
      </Helmet>
      <PageTitle text={'Welcome to ddot.info'} icon={faHome} />
      <RoutesList routes={routes} />
    </>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: {feedIndex: 32}, orderBy: ROUTE_SORT_ORDER_ASC) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        textColor: routeTextColor
        desc: routeDesc
        type: routeType
        routeId
        routeSortOrder
      }
      stops: allStopsList(condition: { feedIndex: 32 }) {
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
