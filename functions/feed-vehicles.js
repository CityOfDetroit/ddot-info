// Agency-wide vehicle positions from Swiftly, normalized and durably cached.
//
// This endpoint takes NO parameters, and that is load-bearing. A stable URL means
// a single CDN cache key, which means Swiftly sees ~1 request per S_MAXAGE no matter
// how many people are on the site. Adding a query param would give every route its
// own cache key and put us straight back to calling Swiftly per-visitor — which the
// 180-requests/15min key cannot survive.
//
// Replaces the old route.js (vehicles for one route) and vehicle.js (vehicles by id):
// the whole fleet is ~6 KB gzipped, so clients fetch it once and filter locally.

const AGENCY = process.env.SWIFTLY_AGENCY
const KEY = process.env.SWIFTLY_KEY

// Swiftly publishes vehicle positions every ~5s. We refresh every 15s to match the
// client tick. Budget: 2 feeds * 4/min * 15min = 120 of our 180 calls.
const S_MAXAGE = 15
const SWR = 30

const FEED_URL = `https://api.goswift.ly/real-time/${AGENCY}/gtfs-rt-vehicle-positions?format=json`

// GTFS-rt gives us currentStopSequence/stopId/currentStatus directly, so unlike
// BusTime there is no pattern geometry to walk to find the next stop.
function normalize(entity) {
  const v = entity.vehicle
  if (!v || !v.position) return null

  const { latitude, longitude, bearing, speed } = v.position
  if (typeof latitude !== "number" || typeof longitude !== "number") return null

  // Buses with no trip assignment are deadheading (~14 of ~151 mid-afternoon). They
  // carry no routeId, so nothing downstream can place them — every consumer filters
  // by route. Dropped here to keep the payload honest.
  const trip = v.trip
  if (!trip || trip.routeId == null) return null

  return {
    type: "Feature",
    properties: {
      vid: (v.vehicle && v.vehicle.id) || entity.id,
      // routeId is the GTFS route_id, which for this feed is identical to
      // route_short_name for all 37 routes — so clients can match on short name.
      routeId: trip.routeId != null ? String(trip.routeId) : null,
      tripId: trip.tripId != null ? String(trip.tripId) : null,
      directionId: trip.directionId != null ? Number(trip.directionId) : null,
      // The stop the bus is at or heading to; pair with `status` to tell which.
      stopId: v.stopId != null ? String(v.stopId) : null,
      stopSequence: v.currentStopSequence != null ? Number(v.currentStopSequence) : null,
      status: v.currentStatus || null,
      // bearing is absent on stationary buses
      bearing: typeof bearing === "number" ? bearing : null,
      speed: typeof speed === "number" ? speed : null,
      timestamp: v.timestamp != null ? Number(v.timestamp) : null,
    },
    geometry: { type: "Point", coordinates: [longitude, latitude] },
  }
}

// Backstop for the CDN, not a replacement for it.
//
// Netlify runs functions on Lambda, which reuses a container across invocations and
// handles one request at a time per container — so this survives between requests
// and needs no lock. When the durable cache is working this never fires. When it
// isn't, it bounds Swiftly to ~1 call per warm container per S_MAXAGE rather than
// one per request, which is the difference between degraded and over the limit.
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
    // 429 here means we've blown the rate limit — surface it rather than hiding it,
    // and never cache it, or we'd serve the error for S_MAXAGE.
    return json(res.status === 429 ? 429 : 502, { error: `swiftly returned ${res.status}` }, false)
  }

  let feed
  try {
    feed = await res.json()
  } catch (e) {
    return json(502, { error: "swiftly returned malformed json" }, false)
  }

  const entities = feed.entity || feed.entities || []
  const features = entities.map(normalize).filter(Boolean)

  const body = JSON.stringify({
    type: "FeatureCollection",
    // Feed timestamp, not fetch time: lets clients show true data age even when
    // a cached copy is being served.
    timestamp: feed.header && feed.header.timestamp ? Number(feed.header.timestamp) : null,
    features,
  })

  memo = { at: Date.now(), body }
  return { statusCode: 200, headers: cacheHeaders(true), body }
}

function cacheHeaders(cacheable) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }

  if (cacheable) {
    // `durable` keeps this in Netlify's globally shared cache tier, so edge nodes
    // reuse one response instead of each invoking this function against Swiftly.
    headers["Netlify-CDN-Cache-Control"] =
      `public, durable, s-maxage=${S_MAXAGE}, stale-while-revalidate=${SWR}`
    // Browsers revalidate every poll and get the CDN copy; the CDN, not the client,
    // decides when Swiftly is actually hit.
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
