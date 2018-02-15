import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'
import _ from 'lodash'

import buffer from '@turf/buffer';
import bbox from '@turf/bbox';

import {defaultMapStyle, routeLineIndex, stopLabelIndex, stopPointIndex} from '../style.js'

import WebMercatorViewport from 'viewport-mercator-project';

class NearbyMap extends Component {

  render() {

    console.log(this.props)

    // show all nearby stops
    const stopIds = _.map(this.props.data.data.list, s => { return s.id.slice(5) })
    let style = defaultMapStyle
    style = style.setIn(['layers', stopPointIndex, 'filter'], ["in", "stop_id"].concat(stopIds))
    style = style.setIn(['layers', stopLabelIndex, 'filter'], ["in", "stop_id"].concat(stopIds))
    style = style.setIn(['layers', stopLabelIndex, 'layout', 'visibility'], 'visible')
    style = style.setIn(['layers', stopPointIndex, 'layout', 'visibility'], 'visible')


    // show all nearby routes
    const routeIds = _.map(this.props.data.data.references.routes, r => { return parseInt(r.shortName )})
    style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(_.map(routeIds, r => { return r.toString() })))

    // set data for geolocated source to coords
    const geolocatedPoint = [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            this.props.coords.longitude,
            this.props.coords.latitude
          ]
        }
      }
    ]
    style = style.setIn(['sources', 'geolocated', 'data'], {"type": "FeatureCollection", "features": geolocatedPoint})

    // making some walking dist radii
    const walkRadii = [buffer(geolocatedPoint[0].geometry, 250, {units: 'meters'})]
    const radiusBbox = bbox(walkRadii[0])
    console.log(walkRadii)

    const viewport = new WebMercatorViewport({width: window.innerWidth/2, height: (window.innerHeight - 100)});
    const bound = viewport.fitBounds(
    [
      [radiusBbox[0], radiusBbox[1]], 
      [radiusBbox[2], radiusBbox[3]]
    ],
      {padding: window.innerWidth*0.05})

    console.log(bound)

    style = style.setIn(['sources', 'walk-radius', 'data'], {"type": "FeatureCollection", "features": walkRadii})

    return (
      <div className="map">
        <StaticMap
          width={window.innerWidth/2}
          height={window.innerHeight-100}
          latitude={bound.latitude}
          longitude={bound.longitude}
          zoom={bound.zoom}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} >
        </StaticMap> 
      </div>
    )
  }
}

export default NearbyMap;