const routes = require('./allRoutes.json')
const routeShapes = require('./routeShapes.json')

let features = routeShapes.features.map(rs => {
  let matching = routes.filter(r => r.RouteNum === rs.properties.RouteNum)[0]
  return {
    type: "Feature",
    properties: {...rs.properties, ...matching},
    geometry: rs.geometry
  }
})

exports.shapes = {
  "type": "FeatureCollection",
  "features": features
}