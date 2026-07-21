// Agency-wide trip updates from Swiftly, inverted into a stop_id -> arrivals index
// and durably cached.
//
// NOT for browsers: the raw feed is ~971 KB (79 KB gzipped) and Swiftly documents
// GTFS-rt as server-to-server only (no CORS header). stop.js fetches this through
// the CDN and serves a few hundred bytes per stop.
//
// Like feed-vehicles this takes NO parameters, so it stays one cache key and Swiftly
// sees ~1 request per S_MAXAGE regardless of traffic. Together the two feeds cost
// 2 * 4/min * 15min = 120 of our 180 calls per 15 minutes, flat.
//
// GTFS-rt is indexed by trip; the stop page needs it by stop. We invert once here,
// per cache period, rather than making every stop request scan the whole feed.

const AGENCY = process.env.SWIFTLY_AGENCY
const KEY = process.env.SWIFTLY_KEY

const S_MAXAGE = 15
const SWR = 30

const FEED_URL = `https://api.goswift.ly/real-time/${AGENCY}/gtfs-rt-trip-updates?format=json`

function invert(entities) {
  // stopId -> [{ t, tripId, routeId, vid, seq }]
  const stops = Object.create(null)

  for (const entity of entities) {
    const update = entity.tripUpdate || entity.trip_update
    if (!update) continue

    const trip = update.trip || {}
    if (trip.routeId == null || trip.tripId == null) continue

    // Cancelled trips currently arrive with no stopTimeUpdates at all, so they'd
    // drop out anyway — but skip them explicitly, or the day Swiftly starts sending
    // times with them we'd show arrivals for buses that aren't running.
    if (trip.scheduleRelationship === "CANCELED") continue

    // Null when a trip update carries no vehicle. GTFS-rt permits it, so clients
    // must handle it, but in practice every trip reaching the index has one today.
    const vid = update.vehicle && update.vehicle.id != null ? String(update.vehicle.id) : null

    const times = update.stopTimeUpdate || update.stop_time_update || []
    for (const stu of times) {
      const stopId = stu.stopId != null ? String(stu.stopId) : (stu.stop_id != null ? String(stu.stop_id) : null)
      if (stopId === null) continue

      // SKIPPED means the bus will pass this stop without serving it (~7% of
      // updates). Including it would promise riders a bus that never stops.
      if (stu.scheduleRelationship === "SKIPPED") continue

      // Prefer arrival; departure-only is normal at a route's first stop.
      const arrival = stu.arrival && stu.arrival.time
      const departure = stu.departure && stu.departure.time
      const t = arrival != null ? Number(arrival) : departure != null ? Number(departure) : null
      if (t === null) continue

      const seq = stu.stopSequence != null ? Number(stu.stopSequence) : (stu.stop_sequence != null ? Number(stu.stop_sequence) : null)

      ;(stops[stopId] || (stops[stopId] = [])).push({
        t,
        tripId: String(trip.tripId),
        routeId: String(trip.routeId),
        vid,
        seq,
      })
    }
  }

  for (const stopId in stops) stops[stopId].sort((a, b) => a.t - b.t)
  return stops
}

// Backstop for the CDN, not a replacement for it. Matters more here than in
// feed-vehicles: every stop.js invocation fans into this endpoint, so if the CDN
// isn't collapsing those fetches this is the only thing standing between us and one
// Swiftly call per stop request.
//
// Lambda reuses containers across invocations and handles one request at a time per
// container, so this survives between requests and needs no lock.
let memo = null // { at: epochMs, body: string }

exports.handler = async function () {
  if (!AGENCY || !KEY) {
    return json(500, { error: "SWIFTLY_AGENCY / SWIFTLY_KEY not configured" }, false)
  }

  if (memo && Date.now() - memo.at < S_MAXAGE * 1000) {
    return { statusCode: 200, headers: cacheHeaders(true), body: memo.body }
  }

  let res
  try {
    res = await fetch(FEED_URL, { headers: { Authorization: KEY } })
  } catch (e) {
    return json(502, { error: `swiftly unreachable: ${e.message}` }, false)
  }

  if (!res.ok) {
    return json(res.status === 429 ? 429 : 502, { error: `swiftly returned ${res.status}` }, false)
  }

  let feed
  try {
    feed = await res.json()
  } catch (e) {
    return json(502, { error: "swiftly returned malformed json" }, false)
  }

  const entities = feed.entity || feed.entities || []

  const body = JSON.stringify({
    timestamp: feed.header && feed.header.timestamp ? Number(feed.header.timestamp) : null,
    stops: invert(entities),
  })

  memo = { at: Date.now(), body }
  return { statusCode: 200, headers: cacheHeaders(true), body }
}

function cacheHeaders(cacheable) {
  const headers = { "Content-Type": "application/json" }

  if (cacheable) {
    headers["Netlify-CDN-Cache-Control"] =
      `public, durable, s-maxage=${S_MAXAGE}, stale-while-revalidate=${SWR}`
    headers["Cache-Control"] = "public, max-age=0, must-revalidate"
  } else {
    // Never cache errors, or we'd serve the failure for the whole S_MAXAGE.
    headers["Cache-Control"] = "no-store"
  }

  return headers
}

function json(statusCode, body, cacheable) {
  return { statusCode, headers: cacheHeaders(cacheable), body: JSON.stringify(body) }
}
