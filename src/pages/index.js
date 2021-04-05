import '@fortawesome/fontawesome-svg-core/styles.css';
import { faBus, faClock, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from "gatsby";
import React from "react";
import Helmet from 'react-helmet';
import PageTitle from "../components/PageTitle";
import RoutesList from '../components/RoutesList';
import SiteSection from "../components/SiteSection";
import '../css/app.css';

const nodeToFeature = (node, matching) => {
  let { route, ...props } = node
  props.color = '#' + matching.color;
  props.textColor = '#' + matching.textColor;
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
        <p>You can find a description, map, and real-time information for your bus route by clicking the name of the route.</p>
        <p>Click the bus icon <FontAwesomeIcon icon={faBus} className="mx-1" /> for a listing of bus stops, or the schedule <FontAwesomeIcon icon={faClock} className="mx-1" /> icon for a timetable at major stops.</p>
      </SiteSection>
      <RoutesList routes={routes} />
    </>
  )
}

export const query = graphql`
  {
    postgres {
      routes: allRoutesList(condition: { feedIndex: 1 }, orderBy: ROUTE_SORT_ORDER_ASC) {
        short: routeShortName
        long: routeLongName
        color: routeColor
        textColor: routeTextColor
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
