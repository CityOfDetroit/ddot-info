import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { graphql, Link } from "gatsby"
import React, { useState } from "react"
import Helmet from "react-helmet"
import PageTitle from "../components/PageTitle"
import RouteListItem from "../components/RouteListItem"
import SiteSection from "../components/SiteSection"

const MAX_STOP_RESULTS = 25
const badCodes = ["01", "02", "03", "04"]

const SearchPage = ({ data }) => {
  let { routes, stops } = data.postgres

  let [query, setQuery] = useState("")

  let q = query.trim().toLowerCase()

  let matchedRoutes =
    q.length > 0
      ? routes
          .filter(r => r.type === 3)
          .filter(
            r => r.short === q || r.long.toLowerCase().indexOf(q) > -1
          )
      : []

  let matchedStops =
    q.length > 1
      ? stops
          .filter(s => badCodes.indexOf(s.stopCode) === -1)
          .filter(
            s =>
              s.stopName.toLowerCase().indexOf(q) > -1 ||
              s.stopCode === q.replace("#", "")
          )
      : []

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
      <SiteSection>
        <label className="block py-2">
          <span className="text-sm">Route name or number, stop name, or stop number</span>
          <input
            type="search"
            className="form-input mt-1 block w-full"
            placeholder={`Woodward, 4, or 1061`}
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </label>
      </SiteSection>
      {matchedRoutes.length > 0 && (
        <SiteSection title={`Routes`} fullWidth>
          {matchedRoutes.map(r => (
            <RouteListItem route={r} key={r.short} />
          ))}
        </SiteSection>
      )}
      {matchedStops.length > 0 && (
        <SiteSection title={`Stops`} fullWidth>
          {matchedStops.slice(0, MAX_STOP_RESULTS).map(s => (
            <div className="bg-gray-100 px-4 py-2 border-b-2" key={s.stopCode}>
              <Link to={`/stop/${s.stopCode}`}>{s.stopName}</Link>
              <span className="text-sm text-gray-600 ml-2">#{s.stopCode}</span>
            </div>
          ))}
          {matchedStops.length > MAX_STOP_RESULTS && (
            <p className="text-sm text-gray-700 px-4 py-2">
              Showing the first {MAX_STOP_RESULTS} of {matchedStops.length} matching stops; keep typing to narrow it down.
            </p>
          )}
        </SiteSection>
      )}
      {q.length > 1 && matchedRoutes.length === 0 && matchedStops.length === 0 && (
        <SiteSection>
          <p className="text-sm text-gray-700 py-2">
            No routes or stops match “{query}”.
          </p>
        </SiteSection>
      )}
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
