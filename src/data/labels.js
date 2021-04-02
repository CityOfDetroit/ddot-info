import routes from './allRoutes.json'
import rawLabels from './routeLabels.json'
import rawDowntownLabels from './downtownLabels.json'

let features = rawLabels.features.map(rl => {
  let matching = routes.filter(r => r.RouteNum === rl.properties.RouteNum)[0]
  return {
    type: "Feature",
    properties: {...rl.properties, ...matching},
    geometry: rl.geometry
  }
})

export const labels = {
  "type": "FeatureCollection",
  "features": features
}

let downtown = rawDowntownLabels.features.map(rl => {
  let matching = routes.filter(r => r.RouteNum === rl.properties.RouteNum)[0]
  return {
    type: "Feature",
    properties: {...rl.properties, ...matching},
    geometry: rl.geometry
  }
})

export const downtownLabels = {
  "type": "FeatureCollection",
  "features": downtown
}
