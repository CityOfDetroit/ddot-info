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

  let { routes } = data.postgres

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
      <SiteSection>
        <p className="mt-4 text-sm leading-none text-gray-500">9/22/2021</p>
        <p>September service changes have gone into effect.</p>
      </SiteSection>
      <RoutesList routes={routes} />
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
        textColor: routeTextColor
        desc: routeDesc
        type: routeType
        routeId
      }
      stops: allStopsList(condition: { feedIndex: 19 }) {
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
