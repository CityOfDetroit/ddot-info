import { faArrowCircleRight, faBus, faClock, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { graphql } from 'gatsby';
import React, { useState } from "react";
import Helmet from 'react-helmet';
import PageTitle from "../components/PageTitle";
import { RouteButton } from '../components/RouteListItem';
import RouteTitle from '../components/RouteTitle';
import SiteSection from "../components/SiteSection";
import SystemMap from '../components/SystemMap';
import SystemMapRouteType from '../components/SystemMapRouteType';
import allRoutes from '../data/allRoutes.json';
import routeTypes from '../data/routeTypes';

const nodeToFeature = (node, matching) => {
  let { route, ...props } = node
  props.color = '#' + matching.routeColor;
  props.textColor = '#' + matching.routeTextColor
  return {
    "type": "Feature",
    "geometry": route.geometry,
    "properties": props
  }
}

const SystemMapPage = ({ data }) => {

  let pgRoutes = data.pg.allRoutes.edges.map(e => e.node)

  let { routes } = data.pg

  let features = data.allDdotRoute.edges.map(e => {
    let match = pgRoutes.filter(f => f.routeShortName === e.node.short)[0]
    return nodeToFeature(e.node, match)
  })

  let routeFeatures = { type: "FeatureCollection", features: features }

  // let stopsFeatures = stops.map(t => {
  //   let { theGeom, ...props } = t
  //   return {
  //     "type": "Feature",
  //     "geometry": theGeom['geojson'],
  //     "properties": props
  //   }
  // })

  // get a default object marking all routes as true
  let defaultClicked = routes.reduce((total, item) => ({
    ...total,
    [item.short]: true
  }), {})
  let [clicked, setClicked] = useState(defaultClicked)

  // show a popup with this state.
  let [selected, setSelected] = useState([])

  return (
    <>
      <Helmet>
        <title>{`DDOT.info: System map`}</title>
        <meta property="og:url" content={`https://ddot.info/system-map/`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`DDOT system map`} />
        <meta property="og:description" content={`DDOT system map. Get more information about DDOT's 43 routes.`} />
      </Helmet>
      <PageTitle text='System map' icon={faMapMarked} />
      <SystemMap {...{ routeFeatures, clicked, selected, setSelected }} />
      {selected.map((s, i) => {
        let matching = routes.filter(r => r.short === s)[0]
        let matchingAllRoute = allRoutes.filter(r => r.RouteNum.toString() === s)[0]
        return (
          <SiteSection
            key={s}
            titleClassName="border-l-8 border-yellow-300 py-2 bg-gray-200"
            title={<RouteTitle
              long={matching.long}
              color={matching.color}
              short={s}
            />}
            dismissable
            onDismiss={() => setSelected(selected.filter(se => se !== s))}>
            <p className="text-sm leading-tight">
              {matchingAllRoute.Descriptio}
            </p>
            <div className="flex items-center justify-between mb-2">
              <RouteButton icon={faArrowCircleRight} text='Main page' link={`/route/${matching.short}`} ariaLabel={`Main page for ${matching.long}`} />
              <RouteButton icon={faClock} text='Schedule' link={`/route/${matching.short}/schedule`} ariaLabel={`Schedule for ${matching.long}`} />
              <RouteButton icon={faBus} text='Stops' link={`/route/${matching.short}/stops`} ariaLabel={`Stops for ${matching.long}`} />
            </div>

          </SiteSection>
        )
      })}
      {selected.length === 0 && <SiteSection fullWidth title={`Route types`} subtitle={`Click a route for links and information.`}>
        {
          Object.keys(routeTypes).map(rt => {
            let filtered = routes.filter(r => r.color === routeTypes[rt].color)
            return <SystemMapRouteType key={rt} {...{ clicked, setClicked, routeType: rt, filtered: filtered, startsOpen: false }} />
          })
        }
      </SiteSection>}
    </>

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
    allRoutes(condition: {feedIndex: 8}) {
      edges {
        node {
          routeColor
          routeTextColor
          routeDesc
          routeShortName
        }
      }
    }
    routes: allRoutesList(condition: {feedIndex: 8, routeType: 3}, orderBy: ROUTE_SORT_ORDER_ASC) {
      short: routeShortName
      long: routeLongName
      color: routeColor
      type: routeType
      textColor: routeTextColor
      desc: routeDesc
      routeId
    }
  }
}`

export default SystemMapPage;