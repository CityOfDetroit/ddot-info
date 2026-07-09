import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { graphql } from "gatsby"
import React from "react"
import Helmet from "react-helmet"
import PageTitle from "../components/PageTitle"
import SearchBox from "../components/SearchBox"

const SearchPage = ({ data }) => {
  let { routes, stops } = data.postgres

  return (
    <>
      <Helmet>
        <title>{`DDOT.info: Search`}</title>
        <meta property="og:url" content={`https://ddot.info/search/`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`Search DDOT routes and stops`} />
        <meta property="og:description" content={`Search DDOT bus routes and bus stops by name or stop number.`} />
      </Helmet>
      <PageTitle text={`Search`} icon={faSearch} />
      <SearchBox routes={routes} stops={stops} autoFocus />
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
        type: routeType
        routeId
      }
      stops: allStopsList(condition: { feedIndex: 1 }, orderBy: STOP_NAME_ASC) {
        stopCode
        stopName
      }
    }
  }
`

export default SearchPage
