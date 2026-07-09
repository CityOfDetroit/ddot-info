import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import React from 'react';
import RouteNumber from './RouteNumber';
import SiteSection from './SiteSection';

const badCodes = ['01', '02', '03', '04']

// straight-line distance in meters between two lat/lon points
const haversine = (lat1, lon1, lat2, lon2) => {
  const rad = d => d * Math.PI / 180
  const dLat = rad(lat2 - lat1)
  const dLon = rad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2
  return 12742000 * Math.asin(Math.sqrt(a))
}

// round feet to the nearest 50 for display
const feet = meters => Math.max(50, Math.round(meters * 3.281 / 50) * 50)

export const NearbyStops = ({ nearby, stopLat, stopLon }) => {
  let stops = (nearby || [])
    .filter(s => badCodes.indexOf(s.stopCode) === -1)
    .map(s => ({ ...s, distance: haversine(stopLat, stopLon, s.stopLat, s.stopLon) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5)

  if (stops.length === 0) { return null }

  return (
    <SiteSection icon={faMapSigns} title={`Nearby stops`} fullWidth expands startsClosed>
      {stops.map(s => (
        <div key={s.stopCode} className="bg-gray-100 px-4 py-2 border-b-2 flex items-center justify-between">
          <span>
            <Link to={`/stop/${s.stopCode}`}>{s.stopName}</Link>
            <span className="text-sm text-gray-600 ml-2">#{s.stopCode} · ~{feet(s.distance)} ft</span>
          </span>
          <span className="flex items-center">
            {s.routes && s.routes.map(r => (
              <RouteNumber key={r.routeShortName} number={r.routeShortName} color={r.routeColor} size="small" />
            ))}
          </span>
        </div>
      ))}
    </SiteSection>
  )
}

export default NearbyStops
