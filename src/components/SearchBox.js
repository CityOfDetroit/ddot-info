import { Link } from "gatsby"
import React, { useState } from "react"
import RouteListItem from "./RouteListItem"
import SiteSection from "./SiteSection"

const MAX_STOP_RESULTS = 25
const badCodes = ["01", "02", "03", "04"]

// Search over routes ({short, long, color, type}) and stops ({stopCode, stopName}).
export const SearchBox = ({ routes, stops, autoFocus = false }) => {
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
      <SiteSection>
        <label className="block py-2">
          <span className="text-sm">Route name or number, stop name, or stop number</span>
          <input
            type="search"
            className="form-input mt-1 block w-full"
            placeholder={`Woodward, 4, or 1061`}
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus={autoFocus}
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

export default SearchBox
