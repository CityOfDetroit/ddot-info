// Upcoming arrivals for one stop, from Swiftly's trip updates.
//
// Takes ?stopId= (the GTFS stop_id, NOT the stop_code in the page URL — they are
// disjoint ID spaces here, and passing a stop_code silently returns another stop's
// buses rather than erroring).
//
// This is parameterised, so it must NOT call Swiftly: 4375 stops would be 4375 cache
// keys and blow the 180/15min key. Instead it reads feed-trips through our own CDN,
// where the whole agency sits behind ONE cache key. Cache-key fan-out then costs
// function invocations, not rate limit.

const LIMIT = 6
const S_MAXAGE = 15
const SWR = 30

// Resolve feed-trips from the host we were actually called on, NOT process.env.URL.
// Netlify sets URL to the main site address in every context, so on a deploy preview
// it points at production — a preview would quietly read production's feed instead of
// its own (and 502 while production has no feed-trips yet). The host header is right
// in every context: production, deploy previews, branch deploys, and local dev.
function feedUrl(event) {
  const headers = event.headers || {}
  const host = headers.host || headers.Host
  if (!host) return null
  const proto = headers["x-forwarded-proto"] || (host.startsWith("localhost") ? "http" : "https")
  return `${proto}://${host}/.netlify/functions/feed-trips`
}

exports.handler = async function (event) {
  const stopId = event.queryStringParameters && event.queryStringParameters.stopId
  if (!stopId) {
    return json(400, { error: "stopId required" }, false)
  }

  const url = feedUrl(event)
  if (!url) {
    return json(500, { error: "cannot resolve feed-trips host" }, false)
  }

  let res
  try {
    res = await fetch(url)
  } catch (e) {
    return json(502, { error: `feed-trips unreachable: ${e.message}` }, false)
  }
  if (!res.ok) {
    return json(502, { error: `feed-trips returned ${res.status}` }, false)
  }

  let feed
  try {
    feed = await res.json()
  } catch (e) {
    return json(502, { error: "feed-trips returned malformed json" }, false)
  }

  const now = Math.floor(Date.now() / 1000)
  const all = (feed.stops && feed.stops[String(stopId)]) || []

  // Drop arrivals already in the past: the feed keeps a trip's whole stop list,
  // including stops the bus has passed.
  const arrivals = all
    .filter(a => a.t >= now - 30)
    .slice(0, LIMIT)
    .map(a => ({
      tripId: a.tripId,
      routeId: a.routeId,
      // null when Swiftly is predicting a trip with no bus assigned yet (~45% of
      // updates). Clients must hide the bus number and disable tracking for these.
      vid: a.vid,
      time: a.t,
      minutes: Math.max(0, Math.round((a.t - now) / 60)),
      seq: a.seq,
    }))

  return json(200, { stopId: String(stopId), timestamp: feed.timestamp, arrivals }, true)
}

function json(statusCode, body, cacheable) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }

  if (cacheable) {
    headers["Netlify-CDN-Cache-Control"] =
      `public, durable, s-maxage=${S_MAXAGE}, stale-while-revalidate=${SWR}`
    headers["Cache-Control"] = "public, max-age=0, must-revalidate"
  } else {
    headers["Cache-Control"] = "no-store"
  }

  return { statusCode, headers, body: JSON.stringify(body) }
}
